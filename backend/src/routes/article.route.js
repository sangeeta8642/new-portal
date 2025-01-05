import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { singleUpload } from "../middlewares/singleUpload.js";
import {
  getArticle,
  createArticle,
  getAllArticles,
  getArticlesOfAdmin,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

const router = e.Router();

router.route("/add").post(singleUpload, isAuthenticate, createArticle);
router.route("/get/admin").get(isAuthenticate, getArticlesOfAdmin);
router.route("/:id").get(isAuthenticate, getArticle);
router.route("/").get(getAllArticles);
router.route("/").delete(isAuthenticate, deleteArticle);
router.route("/").put(singleUpload, isAuthenticate, updateArticle);

export default router;
