import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../utils";

const NotFound = () => {
    const nav = useNavigate()
    const handleRedirect = () => {
        if (user) {
            if (user.role === "admin") {
                nav("/admin/article")
            } else {
                nav("/articles")
            }
        } else {
            nav('/')
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">404 Not Found</h1>
                <p className="mt-4 text-lg">
                    Sorry, the page you're looking for does not exist.
                </p>
                <button onClick={handleRedirect} className="text-blue-500 hover:underline mt-6 inline-block">
                    Go back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
