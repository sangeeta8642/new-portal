import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Articles from "./pages/articles";
import CreateArticle from "./pages/admin/createArticle";
import MyArticles from "./pages/admin/myArticles";
import UpdateArticle from "./pages/admin/updateArticle";
import ViewArticle from "./pages/admin/viewArticle";
import AdminComments from "./pages/admin/comments";
import Comments from "./pages/comments";
import Profile from "./pages/profile";
import MyFavorites from "./pages/myFavorites";
import NotFound from "./pages/not-found";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoutes";
// import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute"; // Import ProtectedRoute and AdminRoute

const AdminLayout = ({ children }) => (
    <div>
        {/* Admin UI like sidebar or header */}
        {children}
    </div>
);

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Signup /></ProtectedRoute>,
    },
    {
        path: "/login",
        element: <ProtectedRoute><Login /></ProtectedRoute>,
    },
    {
        path: "/articles",
        element: <Articles />,
    },
    {
        path: "/article/comments",
        element: <Comments />,
    },
    {
        path: "/profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
    },
    {
        path: "/favorites",
        element: <ProtectedRoute><MyFavorites /></ProtectedRoute>,
    },
    {
        path: "/view",
        element: <ProtectedRoute><ViewArticle /></ProtectedRoute>,
    },
    {
        path: "/admin",
        element: <AdminRoute><AdminLayout /></AdminRoute>, // Admin layout with nested admin routes
        children: [
            {
                path: "create",
                element: <CreateArticle />,
            },
            {
                path: "update",
                element: <UpdateArticle />,
            },
            {
                path: "article",
                element: <MyArticles />,
            },
            {
                path: "comments",
                element: <AdminComments />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

// AdminLayout can be a wrapper component for admin routes, to include common admin UI

