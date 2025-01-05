import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

const CreateArticles = () => {
  const user = JSON.parse(localStorage.getItem("auth"))
  const nav = useNavigate()
  const location = useLocation()

  const article = location.state?.art

  console.log("article", article);

  const [formData, setFormData] = useState({
    title: article.title,
    categories: article.categories,
    tags: article.tags,
    admin: user._id,
    file: null,
    content: article.content
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "file") {
          data.append(key, formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      });

      console.log([...data.entries()]);
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/article/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        nav('/admin/article')
      }
      console.log(res.data);
    } catch (error) {
      console.error("Error during submission:", error.response || error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <button onClick={() => nav('/admin/article')}><FaArrowLeftLong /></button>
      <h2 className="text-2xl font-bold mb-6 text-center">Update Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Content :</label>
          <textarea
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>


        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Categories(separated by comma):</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags(separated by comma):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Banner:</label>
          <img src={article.banner} width={100} height={50} alt="" />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticles;

// import React from 'react'
// import ArticleEditor from '../../components/articleEditor'

// const CreateArticle = () => {
//   return (
//     <ArticleEditor />
//   )
// }

// export default CreateArticle