import {useSelector} from "react-redux";
import {selectUser} from "../../entities/user/model/userSlice.ts";
import {Navigate, Outlet} from "react-router-dom";
import {Routes} from "../constants/routes.ts";

const ProtectedRoutes = () => {
    const user = useSelector(selectUser)

    if (!user) {
        return <Navigate to={Routes.Login}></Navigate>
    }

    return (
        <Outlet/>
    );
};

export default ProtectedRoutes;