import {Box, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate('/')
    }, 2000)

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h1">
                404
            </Typography>
            <Typography variant="h6">
                The page you’re looking for doesn’t exist.
            </Typography>
            {/*<Button variant="contained" onClick={handleGoHome}>Back Home</Button>*/}
            <Typography variant="h6" style={{color: 'gray'}}>
                You will be redirected to the Main page in 2 seconds.
            </Typography>
        </Box>
    );
};

export default NotFound;