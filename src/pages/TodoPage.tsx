import {useNavigate, useParams} from "react-router-dom";
import {Button, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useGetTodosInfoQuery} from "../entities/todo/api/todosApi.ts";

const TodoPage = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const params = useParams();
    const {data: todo, isLoading} = useGetTodosInfoQuery(params.id!, {skip: !params.id})

    if (isLoading) {
        return <Box sx={{textAlign: 'center'}}><CircularProgress/></Box>
    }

    if (!todo || !params.id) return <>
        <Typography variant={'h5'} sx={{textAlign: 'center'}}>ToDo not found</Typography>
        <Button fullWidth={true} onClick={goBack} variant={'outlined'}>Go back</Button>
    </>;

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