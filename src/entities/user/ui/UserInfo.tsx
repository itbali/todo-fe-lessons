import {useSelector} from "react-redux";
import {selectUser} from "../model/userSlice.ts";
import {AccountBox} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {formatDistanceToNow} from "date-fns";

const UserInfo = () => {
    const user = useSelector(selectUser)

    const loggedDate = new Date(1730134058800)

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <AccountBox sx={{fontSize: '100px'}}/>
                <Typography variant={'h5'} data-testid={"name"}>
                    User Name: {user?.username}
                </Typography>
            </Box>
            <Typography>is logged from: {formatDistanceToNow(loggedDate)}</Typography>
        </>
    );
};

export default UserInfo;