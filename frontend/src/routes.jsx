import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import Articles from "./pages/articles";
import CreateArticle from "./pages/admin/createArticle";
import MyArticles from "./pages/admin/myArticles";

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
        path: "/admin/create/",
        element: <CreateArticle />,
    },
    {
        path: "/admin/article",
        element: <MyArticles />,
    },
]);
