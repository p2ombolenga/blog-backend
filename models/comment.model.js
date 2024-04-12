import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
    }
},
{
    timestamps: true,
}
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;