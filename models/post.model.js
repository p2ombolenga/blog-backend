import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }],
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
    }],
},
{
    timestamps: true,
}
);

const Post = mongoose.model('Post', postSchema);

export default Post;