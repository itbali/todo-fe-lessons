import {useSelector} from "react-redux";
import {selectUser} from "../../entities/user/model/userSlice.ts";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    const user = useSelector(selectUser);
    if(!user){
        return <Navigate to={'/login'}/>;
    }

    return (
        <Outlet/>
    );
};

export default ProtectedRoutes;