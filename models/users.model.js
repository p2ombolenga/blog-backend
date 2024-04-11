import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: 6,
    },
    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: "posts",
    }],
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;