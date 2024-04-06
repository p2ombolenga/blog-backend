import express from "express"
import { createPost, getPosts, getApost, updatePost, deletePost} from "../controllers/post.controller.js"

const postRouter = express.Router()

postRouter.get('/', getPosts);
postRouter.get('/:id', getApost);
postRouter.post('/:id', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;