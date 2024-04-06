import express from "express"
import { createPost, getPosts, getApost, updatePost } from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.get('/', getPosts);
postRouter.get('/:id', getApost);
postRouter.post('/:id', createPost);
postRouter.put('/:id', updatePost);

export default postRouter;