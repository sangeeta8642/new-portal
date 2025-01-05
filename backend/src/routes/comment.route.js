import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import {
  updateCommentStatus,
  createComment,
  getAllComment,
  updateComment,
  getCommentOfStatus,
  deleteComment,
  getCommentsByArticle,
  getPendingComments,
} from "../controllers/comment.controller.js";

const router = e.Router();

router.route("/").post(isAuthenticate, createComment);
router.route("/").get(isAuthenticate, getAllComment);
router.route("/").put(isAuthenticate, updateComment);
router.route("/status").put(isAuthenticate, updateCommentStatus);
router.route("/by/status").post(isAuthenticate, getCommentOfStatus);
router.route("/").delete(isAuthenticate, deleteComment);
router.route("/by/article").post(isAuthenticate, getCommentsByArticle);
router.route("/pending").post(isAuthenticate, getPendingComments);

export default router;
