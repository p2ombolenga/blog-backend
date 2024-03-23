import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use('/api/user', async(req, res) => {
    res.send("Hello");
});


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Connected to database");
    app.listen(process.env.PORT, () =>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log("Connection failed:", error);
});
