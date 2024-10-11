import {useSelector} from "react-redux";
import {selectUser} from "../model/userSlice.ts";
import {Person} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const UserInfo = () => {
    const user  = useSelector(selectUser)

    return (
        <div>
            <Person sx={{fontSize: '40px'}}/>
            <Typography variant="h6" >{user?.username}</Typography>
            <Typography variant="subtitle1" >Your token is :  {user?.access_token.slice(0, 21)}</Typography>
        </div>
    );
};

export default UserInfo;