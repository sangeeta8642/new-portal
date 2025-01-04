import e from "express";
import isAuthenticate from "../middlewares/isAuthenticate.js";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/singleUpload.js";

const router = e.Router();

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/id").get(isAuthenticate, getUser);

export default router;
