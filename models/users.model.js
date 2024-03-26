import mongoose from "mongoose";

const  userChema = new mongoose.Schema({
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
    }
},
{
    timestamps: true
});

const User = mongoose.models.user || mongoose.model('User', userChema);
export default User;