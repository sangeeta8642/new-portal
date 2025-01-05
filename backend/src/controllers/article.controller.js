import { User } from "../models/user.model.js";
import { Article } from "../models/articles.model.js";
import { sendResponse } from "../utils/apiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const createArticle = async (req, res) => {
  console.log(req.body);

  try {
    const { title, admin, categories, tags, content } = req.body;

    if (!title || !admin || !categories || !tags || !content) {
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
      content,
    });

    await article.save();
    return sendResponse(res, 201, "article added successfully", true, article);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const updateArticle = async (req, res) => {
  console.log(req.body);

  try {
    const { articleId, title, admin, categories, tags, content } = req.body;

    if (!articleId) {
      return sendResponse(res, 400, "Article ID is required");
    }

    const article = await Article.findById(articleId);
    if (!article) {
      return sendResponse(res, 404, "Article not found");
    }

    if (admin) {
      const isAdminExists = await User.findById(admin);
      if (!isAdminExists) {
        return sendResponse(res, 400, "No user found");
      }
    }

    const file = req.file;
    if (file) {
      // Extract the public_id from the existing image URL
      const publicId = article.banner.split("/").slice(-1)[0].split(".")[0];

      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(publicId);

      // Upload the new image
      const fileUri = getDataUri(file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);

      // Update the article's banner with the new image URL
      article.banner = cloudRes.secure_url;
    }

    if (title) article.title = title;
    if (categories) article.categories = categories.split(",");
    if (tags) article.tags = tags.split(",");
    if (content) article.content = content;

    await article.save();

    return sendResponse(
      res,
      200,
      "Article updated successfully",
      true,
      article
    );
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
