import { sendResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Article } from "../models/articles.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return sendResponse(res, 400, "This email already in use");
    }

    const file = req.file;
    if (!file) {
      return sendResponse(res, 400, "Please provide the profile pic");
    }

    const fileUri = getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content);

    let user = await User.create({
      name,
      email,
      password,
      profilePic: cloudRes.secure_url,
      role,
    });

    await user.save();
    return sendResponse(res, 201, "User registed successfully", true, user);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendResponse(res, 400, "Please provide the complete data");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, "No User found");
    }

    const isPasswordMatched = await user.matchPassword(password);

    if (!isPasswordMatched) {
      return sendResponse(res, 400, "Invalid password");
    }
    const UserData = await User.findOne({ email }).select("-password");

    const token = jwt.sign({ UserId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const Options = {
      httpOnly: process.env.COOKIE_HTTPONLY,
      secure: process.env.COOKIE_SECURE,
      sameSite: process.env.COOKIE_SAMESITE,
      maxAge: parseInt(process.env.COOKIE_MAXAGE, 10),
    };

    res.cookie("token", token, Options);

    return sendResponse(res, 200, "login successfull", true, UserData);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const adminId = req.id;

    if (!adminId) {
      return sendResponse(res, 400, "Please provide the adminId");
    }

    const admin = await User.findById(adminId);

    if (!admin) {
      return sendResponse(res, 404, "No doctor found");
    }

    return sendResponse(res, 200, "", true, admin);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const addToFavorites = async (req, res) => {
  const { articleId } = req.body;
  const userId = req.id; 
  try {
     const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(articleId)) {
      return res
        .status(400)
        .json({ message: "Article is already in favorites" });
    }

    user.favorites.push(articleId);

     await user.save();

    return sendResponse(
      res,
      200,
      "Article added to favorites",
      true,
      user.favorites
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message);
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.id; 
  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return sendResponse(
      res,
      200,
      "Favorites retrieved successfully",
      true,
      user.favorites
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message);
  }
};

export const removeFromFavorites = async (req, res) => {
  const { articleId } = req.body; 
  const userId = req.id; 

  try {
     const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(articleId)) {
      return res.status(400).json({ message: "Article is not in favorites" });
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== articleId);

    await user.save();

     return sendResponse(
      res,
      200,
      "Article removed from favorites",
      true,
      user.favorites
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message);
  }
};

