import User from "../models/users.model.js";
import bcrypt from "bcryptjs"; 

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                status: "404",
                message: "Users not found"
            });
        }
        return res.status(200).json({
            status: "200",
            message: "Users are retrieved successfully",
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed to retrieve users",
            error: error.message
        });
    }
};

export const createUser = async (req, res) =>{
        const { name, email, password} = req.body
        let existingUser;
        try {
            existingUser = await User.findOne({ email });
            if(existingUser){
                return res.status(400).json({
                    status: 400,
                    message: "User already exists"
                })
            }

            const hashedPassword = bcrypt.hashSync(password);

            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });
            res.status(201).json({
                status: "201",
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: "500",
                message: "failed to create a user",
                error: error.message
            });
        }

}; 

export const loginUser = async (req, res) => {
    const { email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                status: "400",
                 message: "Incorrect password"
            });
        }
        return res.status(200).json({
            status: "200",
             message: "Login Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to log User in",
            error: error.message
        })
    }
};
