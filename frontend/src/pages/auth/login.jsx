import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate()

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
      // const data = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   if (key === "file") {
      //     data.append(key, formData[key]);
      //   } else {
      //     data.append(key, formData[key]);
      //   }
      // });

      // console.log([...data.entries()]);
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.setItem("auth", JSON.stringify(res.data.data))
        if (res.data.data.role === "admin") {
          nav("/admin/create/")

        } else {
          nav('/articles')
        }
      }
      console.log(res.data);
    } catch (error) {
      console.error("Error during submission:", error.response || error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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

export default Login;
