import express from "express";
import { getPostComments } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get('/:id/post', getPostComments);
commentRouter.get('/:postId/post/:commentId/comment', getPostComments);

export default commentRouter;