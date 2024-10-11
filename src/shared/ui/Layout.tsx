import {ToolBar} from "./ToolBar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <ToolBar />
            <Outlet />
        </>
    );
};

export default Layout;