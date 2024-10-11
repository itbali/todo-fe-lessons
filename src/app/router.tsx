import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import About from "../pages/About.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Login from "../pages/Login.tsx";
import Layout from "../shared/ui/Layout.tsx";
import ProtectedRoutes from "../shared/util/ProtectedRoutes.tsx";
import Profile from "../pages/Profile.tsx";
import Todo from "../pages/Todo.tsx";
import {Routes} from "../shared/constants/routes.ts";

export  const router = createBrowserRouter([
    {
        path: Routes.Home,
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
        {
            element: <ProtectedRoutes/>,
            children: [
                {
                    index: true,
                    element: <App/>,
                },
                {
                    path: Routes.Profile,
                    element: <Profile/>,
                },
                {
                    path: Routes.Todo,
                    element: <Todo/>,
                },

            ]
        },
        {
            path: Routes.About,
            element: <About/>,
        },
        {
            path: Routes.Login,
            element: <Login/>,
        },
        {
            path: Routes.NotFound,
            element: <NotFoundPage/>,
        },]
    },

]);