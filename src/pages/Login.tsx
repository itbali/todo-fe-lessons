import SignUpForm from "../entities/user/ui/SignUpForm.tsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../entities/user/model/userSlice.ts";

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser)

    if (user) {
        navigate('/')
    }

    return (
        <SignUpForm/>
    );
};

export default Login;