import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/users.model.js";

// a controller to retrieve comments associated to post
export const getPostComments = async(req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({
                status: "404",
                message: "Post not found",
            });
        }
        const comments = await Comment.find();
        return res.status(200).json({
            status: "200",
            message: "comments found",
            data: comments,
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve comments",
            error: error.message,
        });
    }
};

// a controller to retrieve a single comment of a specific post
export const getSingleComment = async(req, res) => {
    const { postId, commentId } = req.params;
try {
    const post = await Post.findById(postId);
    if(!post){
        return res.status(404).json({
            status: "404",
            message: "Post not found",
        });
    }
    const comment = await Comment.findById(commentId);
    if(!comment){
        return res.status(404).json({
            status: "404",
            message: "Comment not found",
        });
    }

    return res.status(200).json({
        status: "200",
        message: "Retrieving single comment success",
        data: comment
    });

} catch (error) {
    return res.status(500).json({
        status: "500",
        message: "Failed to retrieve a single comment",
        error: error.message,
    });
}
};

// a controller to create a comment
export const createComment = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                status: "404",
                message: "Post not found",
            });
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                status: "404",
                message: "User not found",
            });
        }
        const comment = await Comment.create({
            comment: req.body.comment,
            post: postId,
            user: userId
        });
        await Post.findByIdAndUpdate(postId, 
            {$push: {comment: comment._id}});
        await User.findByIdAndUpdate(userId, 
            {$push: {comment: comment._id}});
        return res.status(201).json({
            status: "201",
            message: "Comment created",
            data: comment,
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to create a comment",
            error: error.message,
        });
    }
};

// a controller to update comment
export const changeComment = async (req, res) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({
                status: "404",
                message: "Comment not found",
            });
        }
        await Comment.findByIdAndUpdate(id, {comment: req.body.comment});
        return res.status(201).json({
            status: "201",
            message: "Comment Updated",
        });
    } catch(error){
        return res.status(500).json({
            status: "500",
            message: "Failed to update comment",
            error: error.message,
        });
    }
};

// a controller to delete a comment
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if(!comment){
            return res.status(404).json({
                status: "404",
                message: "Comment not found",
            });
        }
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            status: "200",
            message: "Comment deleted",
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to delete a comment",
            error: error.message,
        });
    }
};