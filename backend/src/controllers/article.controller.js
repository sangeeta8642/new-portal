import { User } from "../models/user.model.js";
import { Article } from "../models/articles.model.js";
import { sendResponse } from "../utils/apiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const createArticle = async (req, res) => {
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
      const publicId = article.banner.split("/").slice(-1)[0].split(".")[0];

      await cloudinary.uploader.destroy(publicId);

      const fileUri = getDataUri(file);
      const cloudRes = await cloudinary.uploader.upload(fileUri.content);

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

    const articles = await Article.find({
      admin: adminId,
      draft: false,
    }).populate("admin");
    if (!articles || !articles.length > 0) {
      return sendResponse(res, 404, "This admin has no articles");
    }
    return sendResponse(res, 200, "", true, articles);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getArticlesOfAdminDraft = async (req, res) => {
  try {
    const adminId = req.id;

    if (!adminId) {
      return sendResponse(res, 400, "Please provide the adminId");
    }

    const admin = await User.findById(adminId);

    if (!admin) {
      return sendResponse(res, 404, "No doctor found");
    }

    const articles = await Article.find({
      admin: adminId,
      draft: true,
    }).populate("admin");
    if (!articles || !articles.length > 0) {
      return sendResponse(res, 404, "This admin has no draft articles");
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

// export const getAllArticles = async (req, res) => {
//   try {
//     const articles = await Article.find();

//     if (!articles) {
//       return sendResponse(res, 404, "No articles found");
//     }
//     return sendResponse(res, 200, "", true, articles);
//   } catch (error) {
//     return sendResponse(res, 500, error.message);
//   }
// };

export const getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const { query = "", categories = "" } = req.query;

    let searchCondition = { $or: [] };

    // Global search for `query` across multiple fields
    if (query.trim()) {
      searchCondition.$or.push(
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } }
      );
    }

    // Search within `categories` array
    if (categories.trim()) {
      const categorieSearch = await Article.find({
        categories: { $regex: categories, $options: "i" },
      }).select("categories");

      const uniqueCategories = [
        ...new Set(
          categorieSearch.flatMap((article) => article.categories)
        ),
      ];

      if (uniqueCategories.length > 0) {
        searchCondition.$or.push({ categories: { $in: uniqueCategories } });
      }
    }

    if (searchCondition.$or.length === 0) {
      searchCondition = {};
    }

    console.log("Search Query:", query);
    console.log("Categories Filter:", categories);

    const totalDocs = await Article.countDocuments(searchCondition);

    console.log("Total Documents:", totalDocs);

    const Articles = await Article.find(searchCondition)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(totalDocs / limit);

    return res.status(200).json({
      success: true,
      message: "Fetched paginated data successfully",
      data: {
        currentPage: page,
        totalPages: totalPages,
        totalDocs: totalDocs,
        limit: limit,
        Articles: Articles,
        searchCondition: searchCondition,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
    });
  }
};


export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, "Please provide the Id");
    }

    const article = await Article.findById(id);

    if (!article) {
      return sendResponse(res, 404, "No article found");
    }

    const imagePublicId = article.image?.split("/").pop().split(".")[0];

    if (imagePublicId) {
      await cloudinary.v2.uploader.destroy(imagePublicId, (error, result) => {
        if (error) {
          console.error("Cloudinary image deletion error:", error);
          return sendResponse(
            res,
            500,
            "Failed to delete the image from Cloudinary"
          );
        }
      });
    }

    await article.deleteOne();

    return sendResponse(
      res,
      200,
      "Article and its image deleted successfully",
      true
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
