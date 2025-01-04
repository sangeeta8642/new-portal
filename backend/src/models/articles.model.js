import mongoose from "mongoose";
const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [String],
    tags: [String],
    banner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model("Article", articleSchema);
