import express from "express"
import { createPost, getPosts, getApost } from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.get('/', getPosts)
postRouter.get('/:id', getApost)
postRouter.post('/:id', createPost);

export default postRouter;