import Post from "../models/post.model.js";
import User from "../models/users.model.js";
import { validateCreatePost, validateUpdatePost } from "../validations/posts.validation.js";

// controller to retrieve all posts
export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find()
        .populate({
            path: "user",
            select: "name email"
        });
        return res.status(200).json({
            status: "200",
            message: "Posts are retrieved",
            data: posts,
        });
    }
    catch(error){
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve Posts",
            error: error.message,
        });
    }
};

export const getApost = async (req, res) => {
   try {
        const { id } = req.params;
        const post = await Post.findById(id).populate({
            path: "user",
            select: "name email"
        });
        if(!post){
            return res.status(404).json({
                status: "404",
                message: "Post not found",
            });
        }
        return res.status(200).json({
            status: "200",
            message: "Single post is retrieved",
            data: post,
        }); 
   } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve simple post",
            error: error.message,
        });
   }
};

// controller to create a post
export const createPost = async (req, res) => {
    const { error, value } = validateCreatePost(req.body);
    if(error){
        return res.status(400).json({
            status: "400",
            message: "Validation error",
            error: error.message,
        });
    }
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                status: "404",
                message: "User not found",
            });
        } 

        const { title, slug, content} = value;
        const post = await Post.create({
            title,
            slug,
            content,
            user: user.id,
        });
    
        await User.findByIdAndUpdate(
            id,
            {$push: {posts: post._id}},
            {new: true}
            );

        return res.status(201).json({
            status: "201",
            message: "Post created",
            data: post,
        });

    } catch (error) {
        return res.status(500).json({
            status:"500",
            message: "Failed to create a new post",
            error: error.message,
        });
    }
};

export const updatePost = async (req, res) => {
    const { error, value } = validateUpdatePost(req.body);
    if(error){
        return res.status(400).json({
            status: "400", 
            message: "Validation error", 
            error: error.message
        });
    } 
    try{
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({
                status: "404",
                message: "Post not found",
            });
        }

        await Post.findByIdAndUpdate(id, value);
        return res.status(200).json({
            status: "200",
            message: "Post updated",
        });
    }
    catch(error){
        return res.status(500).json({
            status:"500",
            message: "Failed to update a post",
            error: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({
                status: "404",
                message: "Post not found",
            });
        }
        await Post.findByIdAndDelete(id);
        return res.status(200).json({
            status: "200",
            message: "Post Deleted",
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to delete post",
            error: error.message,
        });
    }
};