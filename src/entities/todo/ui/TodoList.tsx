import Grid from "@mui/material/Grid2";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSnackbar} from "notistack";
import {useGetTodosQuery} from "../api/todosApi.ts";
import TodoItemContainer from "./TodoItemContainer.tsx";

const TodoList = () => {
    const {data, isLoading, error} = useGetTodosQuery()
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Error fetching todos', {variant: 'error'})
        }
    }, [error, enqueueSnackbar]);

    if (isLoading) {
        return <CircularProgress/>
    }

    if (data?.length === 0) {
        return <Typography>The ToDo list is empty</Typography>
    } else {
        return <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {data?.map((value, index) => {
                return <TodoItemContainer
                    key={value._id}
                    value={value}
                    index={index}
                />
            })}
        </Grid>
    }
};

export default TodoList;