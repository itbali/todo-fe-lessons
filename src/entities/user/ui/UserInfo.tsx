import {useSelector} from "react-redux";
import {selectUser} from "../model/userSlice.ts";
import {AccountBox} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {formatDistanceToNow} from "date-fns";

const UserInfo = () => {
    const snicker = {
        brand: 'Nike',
        size: '42',
        type: 'EU'
    }
    const fiftySnickers = Array.from({length: 50}, () => snicker)
    const user = useSelector(selectUser)
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [sizeType, setSizeType] = useState<'EU' | 'US' | 'UK'>('EU')
    const [selectedSize, setSelectedSize] = useState<string>('')

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