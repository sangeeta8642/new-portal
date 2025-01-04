import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { singleUpload } from "../middlewares/singleUpload.js";
import {
  getArticle,
  createArticle,
  getAllArticles,
  getArticlesOfAdmin,
} from "../controllers/article.controller.js";

const router = e.Router();

router.route("/add").post(singleUpload, isAuthenticate, createArticle);
router.route("/get/admin").get(isAuthenticate, getArticlesOfAdmin);
router.route("/:id").get(isAuthenticate, getArticle);
router.route("/").get(isAuthenticate, getAllArticles);

export default router;
