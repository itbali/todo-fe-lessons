import {useSelector} from "react-redux";
import {selectUser} from "../model/userSlice.ts";
import {Person} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const UserInfo = () => {
    const user = useSelector(selectUser)

    return (
        <>
            <Person/>
            <Typography>
                {user?.username}
            </Typography>
            <p>Your token: {user?.access_token}</p>
        </>
    );
};

export default UserInfo;