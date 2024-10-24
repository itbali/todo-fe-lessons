import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../entities/user/model/userSlice.ts";
import {Routes} from "../shared/constants/routes.ts";
import LoginRegistrationTabs from "../entities/user/ui/LoginRegistrationTabs.tsx";

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser)

    if (user) {
        navigate(Routes.Home)
    }

    return (
        <LoginRegistrationTabs/>
    );
};

export default Login;