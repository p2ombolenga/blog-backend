import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadToCloud = async (file, res) => {
    try {
        const univeUploads = await cloudinary.uploader.upload(file.path, {
            folder: "Blog Images",
            use_filename: true,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};