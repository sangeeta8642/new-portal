import { User } from "../models/user.model.js";
import { Article } from "../models/articles.model.js";
import { sendResponse } from "../utils/apiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const createArticle = async (req, res) => {
  console.log(req.body);

  try {
    const { title, admin, categories, tags } = req.body;

    if (!title || !admin || !categories || !tags) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isAdminExists = await User.findById(admin);
    if (!isAdminExists) {
      return sendResponse(res, 400, "No user found");
    }

    const file = req.file;
    if (!file) {
      return sendResponse(res, 400, "Please provide the profile pic");
    }

    const fileUri = getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content);

    const catArr = categories.split(",");
    const tagArr = tags.split(",");

    let article = await Article.create({
      title,
      categories: catArr,
      tags: tagArr,
      banner: cloudRes.secure_url,
      admin,
    });

    await article.save();
    return sendResponse(res, 201, "article added successfully", true, article);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const updateArticle = async (req, res) => {
  try {
    const { title, admin, categories, tags } = req.body;

    if (!title || !admin || !categories || !tags) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isAdminExists = await User.findByIdAndUpdate(admin);
    if (!isAdminExists) {
      return sendResponse(res, 400, "No user found");
    }

    const file = req.file;
    if (!file) {
      return sendResponse(res, 400, "Please provide the profile pic");
    }

    const fileUri = getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content);

    const catArr = categories.split(",");
    const tagArr = tags.split(",");

    let article = await Article.create({
      title,
      categories: catArr,
      tags: tagArr,
      banner: cloudRes.secure_url,
      admin,
    });

    await article.save();
    return sendResponse(res, 201, "article added successfully", true, article);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getArticlesOfAdmin = async (req, res) => {
  try {
    const adminId = req.id;

    if (!adminId) {
      return sendResponse(res, 400, "Please provide the adminId");
    }

    const admin = await User.findById(adminId);

    if (!admin) {
      return sendResponse(res, 404, "No doctor found");
    }

    const articles = await Article.find({ admin: adminId }).populate("admin");
    if (!articles || !articles.length > 0) {
      return sendResponse(res, 404, "This admin has no consultations");
    }
    return sendResponse(res, 200, "", true, articles);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the Id");
    }

    const article = await Article.findById(id);

    if (!article) {
      return sendResponse(res, 404, "No article found");
    }

    return sendResponse(res, 200, "", true, article);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    if (!articles) {
      return sendResponse(res, 404, "No articles found");
    }
    return sendResponse(res, 200, "", true, articles);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
