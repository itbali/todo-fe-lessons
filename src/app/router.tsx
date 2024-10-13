import {createBrowserRouter} from "react-router-dom";
import About from "../pages/About.tsx";
import NotFound from "../pages/NotFound.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Login from "../pages/Login.tsx";
import Layout from "../shared/ui/Layout.tsx";
import ProtectedRoutes from "../shared/util/ProtectedRoutes.tsx";
import App from "./App.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
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
                ]
            },
            {
                path: "/about/",
                element: <About/>,
            },
            {
                path: "/login/",
                element: <Login/>,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
        ]
    },
]);