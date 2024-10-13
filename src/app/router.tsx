import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import About from "../pages/About.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/about/",
        element: <About/>,
    },
]);