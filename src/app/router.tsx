import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import About from "../pages/About.tsx";
import NotFound from "../pages/NotFound.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/about/",
        element: <About/>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);