import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import JoditEditor from "jodit-react";

const UpdateArticles = () => {
  const user = JSON.parse(localStorage.getItem("auth"))
  const nav = useNavigate()
  const location = useLocation()

  const article = location.state?.art

  const [formData, setFormData] = useState({
    articleId: article._id,
    title: article.title,
    categories: article.categories,
    tags: article.tags,
    admin: user._id,
    file: null,
    content: article.content,
    draft: false
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const editor = useRef(null);


  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };


  // const handleSubmit = async (e, draft = false) => {
  //   e.preventDefault();

  //   try {
  //     // const data = new FormData();
  //     // Object.keys(formData).forEach((key) => {
  //     //   if (key === "file") {
  //     //     data.append(key, formData[key]);
  //     //   } else {
  //     //     data.append(key, formData[key]);
  //     //   }
  //     // });

  //     // console.log([...data.entries()]);
  //     // let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/article/add`, data, {
  //     //   headers: {
  //     //     "Content-Type": "multipart/form-data",
  //     //   },
  //     //   withCredentials: true,
  //     // });
  //     // if (res.data.success) {
  //     //   nav('/admin/article')
  //     // }
  //     if (draft) {
  //       formData.draft = true
  //     }
  //     console.log(formData);
  //   } catch (error) {
  //     console.error("Error during submission:", error.response || error);
  //   }
  // };

  const handleSubmit = async (e, draft = false) => {
    e.preventDefault();

    try {
      // Update formData immutably to ensure React re-renders correctly
      const updatedFormData = { ...formData, draft };

      console.log(updatedFormData); // Log to verify the draft value
      setFormData(updatedFormData); // Optional: Update state if needed later

      // Example of sending the updatedFormData to the server:
      const data = new FormData();
      Object.keys(updatedFormData).forEach((key) => {
        if (key === "file" && updatedFormData[key]) {
          data.append(key, updatedFormData[key]);
        } else {
          data.append(key, updatedFormData[key]);
        }
      });

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/article`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("res", res);

      if (res.data.success) {
        nav('/admin/article'); // Redirect after success
      }
    } catch (error) {
      console.error("Error during submission:", error.response || error);
    }
  };


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <button onClick={() => nav('/admin/article')}><FaArrowLeftLong /></button>
      <h2 className="text-2xl font-bold mb-6 text-center">Update Article</h2>
      <form className="space-y-4">
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
        {/* <div>
          <label className="block text-gray-700 font-medium mb-1">Content :</label>
          <textarea
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div> */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Content :
          </label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            tabIndex={1} // tabIndex of textarea
            onChange={handleEditorChange}
          />
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
        <div className="flex gap-10">
          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={(e) => handleSubmit(e, true)}
          >
            Save to draft
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={(e) => handleSubmit(e)}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticles;
