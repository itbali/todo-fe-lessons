import SignUpForm from "../entities/user/ui/SignUpForm.tsx";
import { useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../entities/user/model/userSlice.ts";
import {Routes} from "../shared/constants/routes.ts";


const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    if(user){
        navigate(Routes.Home);
    }
    return (
        <SignUpForm/>
    );
};

export default Login;