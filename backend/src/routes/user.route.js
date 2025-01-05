import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import {
  addToFavorites,
  getFavorites,
  getUser,
  loginUser,
  registerUser,
  removeFromFavorites,
} from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/singleUpload.js";

const router = e.Router();

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/id").get(isAuthenticate, getUser);
router.route("/favorites").post(isAuthenticate, addToFavorites);
router.route("/favorites").get(isAuthenticate, getFavorites);
router.route("/favorites").put(isAuthenticate, removeFromFavorites);

export default router;
