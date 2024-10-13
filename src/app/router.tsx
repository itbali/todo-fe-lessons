import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import About from "../pages/About.tsx";
import NotFound from "../pages/NotFound.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
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