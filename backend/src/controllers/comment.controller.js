import { Article } from "../models/articles.model.js";
import { Comment } from "../models/comments.model.js";
import { User } from "../models/user.model.js";
import { sendResponse } from "../utils/apiResponse.js";

export const createComment = async (req, res) => {
  try {
    const { articleId, content } = req.body;
    const userId = req.id;

    if (!articleId || !userId || !content) {
      return sendResponse(res, 400, "please provide the complete data");
    }

    const isArticleExists = await Article.findById(articleId);
    const isUserExists = await User.findById(userId);
    if (!isUserExists) {
      return sendResponse(res, 400, "No user fo und");
    }
    if (!isArticleExists) {
      return sendResponse(res, 400, "No Article found");
    }

    let comment = await Comment.create({
      user: userId,
      article: articleId,
      content,
    });

    await comment.save();
    return sendResponse(res, 201, "Comment posted successfully", true, comment);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find().populate("user");
    if (!comments || !comments.length > 0) {
      return sendResponse(res, 404, "No comments found");
    }
    return sendResponse(res, 200, "", true, comments);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getCommentOfStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return sendResponse(res, 400, "please specify the status");
    }

    const comments = await Comment.find({ status });
    if (!comments || !comments.length > 0) {
      return sendResponse(res, 404, "No comments found");
    }
    return sendResponse(res, 200, "", true, comments);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;

     if (!commentId || !content) {
      return sendResponse(res, 400, "Please provide complete data");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendResponse(res, 404, "Comment not found");
    }

    comment.content = content;
    await comment.save();

    return sendResponse(
      res,
      200,
      "Comment updated successfully",
      true,
      comment
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const updateCommentStatus = async (req, res) => {
  try {
    const { commentId, status } = req.body;

    if (!commentId || !status) {
      return sendResponse(res, 400, "Please provide complete data");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendResponse(res, 404, "Comment not found");
    }

    comment.status = status;
    await comment.save();

    return sendResponse(
      res,
      200,
      "Comment updated successfully",
      true,
      comment
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    if (!commentId) {
      return sendResponse(res, 400, "Please provide complete data");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendResponse(res, 404, "Comment not found");
    }

    await comment.deleteOne();

    return sendResponse(res, 200, "Comment deleted successfully", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export const getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.body;

    if (!articleId) {
      return sendResponse(res, 400, "Please provide an article ID");
    }

    const article = await Article.findById(articleId);
    if (!article) {
      return sendResponse(res, 404, "Article not found");
    }

    const comments = await Comment.find({ article: articleId, status: "a" })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      "Comments fetched successfully",
      true,
      comments
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
export const getPendingComments = async (req, res) => {
  try {
    const { articleId } = req.body;

    if (!articleId) {
      return sendResponse(res, 400, "Please provide an article ID");
    }

    const article = await Article.findById(articleId);
    if (!article) {
      return sendResponse(res, 404, "Article not found");
    }

    const comments = await Comment.find({ article: articleId, status: "p" })
      .populate("user", "name email profilePic")
      .sort({ createdAt: -1 });

    return sendResponse(
      res,
      200,
      "Comments fetched successfully",
      true,
      comments
    );
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};
