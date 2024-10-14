import {useNavigate, useParams} from "react-router-dom";
import {selectTodoById} from "../entities/todo/model/selectors/selectById.ts";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TodoPage = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const params = useParams();
    const todo = useSelector(selectTodoById(params.id))
    if (!todo) return <div>ToDo not found</div>;

    return (
        <>
            <Typography variant={'h3'} sx={{textAlign: 'center'}}>INFO TODO:</Typography>
            <Box sx={{border: '1px solid grey', textAlign: 'center'}}>
                <Typography variant={'body1'}>ID: {JSON.stringify(todo._id)}</Typography>
                <Typography variant={'h4'}>Title: {JSON.stringify(todo.title)}</Typography>
                <Typography variant={'h5'}>Description: {JSON.stringify(todo.description)}</Typography>
                <Typography variant={'body1'}>Created: {JSON.stringify(todo.createdAt)}</Typography>
                <Typography variant={'body1'}>Update: {JSON.stringify(todo.updatedAt)}</Typography>
            </Box>
            <Button fullWidth={true} onClick={goBack} variant={'outlined'}>Go back</Button>
        </>
    );
};

export default TodoPage;