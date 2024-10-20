import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUser, TUser} from "../../entities/user/model/userSlice.ts";
import {Navigate, Outlet} from "react-router-dom";
import {Routes} from "../constants/routes.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {isFuture} from "date-fns";

const ProtectedRoutes = () => {
    const user = useSelector(selectUser)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    if (!user && token) {
        const decoded = jwtDecode<JwtPayload & TUser>(token)
        const tokenExpiredTime = decoded.exp && decoded.exp * 1000

        if (isFuture(tokenExpiredTime!)) {
            dispatch(setUser({access_token: token, username: decoded.username}))
            return <Navigate to={Routes.Home}/>
        } else {
            localStorage.removeItem('token')
            console.warn('Token expired')
            return <Navigate to={Routes.Login}/>
        }
    }

    if (!user) {
        return <Navigate to={Routes.Login}/>
    }

    return (
        <Outlet/>
    );
};

export default ProtectedRoutes;