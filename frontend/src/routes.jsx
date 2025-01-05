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

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/articles",
        element: <Articles />,
    },
    {
        path: "/admin/comments",
        element: <AdminComments />,
    },
    {
        path: "/article/comments",
        element: <Comments />,
    },
    {
        path: "/admin/create",
        element: <CreateArticle />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/favorites",
        element: <MyFavorites />,
    },
    {
        path: "/view",
        element: <ViewArticle />,
    },
    {
        path: "/admin/update",
        element: <UpdateArticle />,
    },
    {
        path: "/admin/article",
        element: <MyArticles />,
    },
    {
        path: "*", 
        element: <NotFound />, 
    },
]);
