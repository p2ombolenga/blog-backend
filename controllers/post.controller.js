import Post from "../models/post.model.js"
import User from "../models/users.model.js"

export const createPost = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                status: "404",
                message: "User not found",
            });
        } 

        const { title, slug, content} = req.body;

        const post = await Post.create({
            title,
            slug,
            content,
            user: user.id,
        });

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
}