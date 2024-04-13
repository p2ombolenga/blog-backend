import express from "express";
import { getPostComments, getSingleComment, createComment, changeComment, deleteComment } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get('/:id/post', getPostComments);
commentRouter.get('/:postId/post/:commentId/comment', getSingleComment);
commentRouter.post('/:postId/post/:userId/user', createComment);
commentRouter.put("/:id/comment", changeComment);
commentRouter.delete('/:id/comment', deleteComment);

export default commentRouter;