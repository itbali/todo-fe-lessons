import {useSelector} from "react-redux";
import {selectUser} from "../model/userSlice.ts";
import {AccountBox} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UserInfo = () => {
    const user = useSelector(selectUser)

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <AccountBox sx={{fontSize: '100px'}}/>
                <Typography variant={'h5'}>
                    Name: {user?.username}
                </Typography>
            </Box>
            <Typography variant={'body1'}>Your token: {user?.access_token}</Typography>
        </>
    );
};

export default UserInfo;