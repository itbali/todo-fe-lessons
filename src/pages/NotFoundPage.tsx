import {useNavigate} from "react-router-dom";
import {Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    }
    return (
        <Container sx={{textAlign: "center", mt: 10}}>
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
               Страница не найдена
            </Typography>
            <Typography variant="body1"gutterBottom>
                К сожалению, страница, которую вы ищите не существует
            </Typography>
            <Button onClick={handleGoHome}>
                Вернуться на главную
            </Button>
            
        </Container>
    );
};

export default NotFoundPage;