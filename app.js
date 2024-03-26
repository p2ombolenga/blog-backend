import express from "express";
import mongoose from "mongoose";
import router from "./routes/user.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/users", router);


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    app.listen(process.env.PORT, () =>{
        console.log(`🚀 Server running on port: http://localhost:${process.env.PORT}`);
    });
    console.log(`✅ DB connected ✅`);
})
.catch((error)=>{
    console.log("Connection failed:", error);
});
