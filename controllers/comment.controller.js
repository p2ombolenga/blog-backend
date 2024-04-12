import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

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
