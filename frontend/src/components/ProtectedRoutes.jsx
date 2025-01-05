import { Navigate } from "react-router-dom";
import { user } from "../utils";
// import { useAuth } from "./hooks/useAuth"; // Custom hook to check authentication status

// Protected Route for logged-in users
export const ProtectedRoute = ({ children }) => {
    // const { user } = useAuth(); // Assuming useAuth hook provides user info

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

// Protected Route for Admin users
export const AdminRoute = ({ children }) => {
    // const { user } = useAuth(); // Assuming useAuth hook provides user info

    if (!user || user.role !== "admin") {
        return <Navigate to="/articles" />;
    }

    return children;
};
