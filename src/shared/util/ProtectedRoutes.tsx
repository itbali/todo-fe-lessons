import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser, TUser} from "../../entities/user/model/userSlice.ts";
import {Navigate, Outlet} from "react-router-dom";
import {Routes} from "../constants/routes.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";

const ProtectedRoutes = () => {
    const user = useSelector(selectUser)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    if (!user && token) {
        const {username} = jwtDecode<JwtPayload & TUser>(token)
        dispatch(setUser({access_token: token, username}))
        return <Navigate to={Routes.Home}/>
    }

    if (!user) {
        return <Navigate to={Routes.Login}/>
    }

    return (
        <Outlet/>
    );
};

export default ProtectedRoutes;