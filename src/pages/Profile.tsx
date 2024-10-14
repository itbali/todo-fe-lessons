import UserInfo from "../entities/user/ui/UserInfo.tsx";
import {Button} from "@mui/material";
import {logout} from "../entities/user/model/userSlice.ts";
import {useDispatch} from "react-redux";

const Profile = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Button
                variant="outlined"
                fullWidth={true}
                onClick={() => {
                    dispatch(logout())
                }}>Logout
            </Button>
            <UserInfo/>
        </>
    );
};

export default Profile;