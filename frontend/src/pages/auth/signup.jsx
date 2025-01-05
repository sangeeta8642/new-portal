import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/navbar";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        file: null,
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
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "file") {
                    data.append(key, formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            });

            console.log([...data.entries()]);
            let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                alert(res.data.message)
                nav("/login")
            }
        } catch (error) {
            console.error("Error during submission:", error.response.data.message);
            alert(error.response.data.message)
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

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

                    {/* Role */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Role:</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={formData.role === "user"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                User
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === "admin"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Admin
                            </label>
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Profile Picture:</label>
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
        </>
    );
};

export default Signup;
