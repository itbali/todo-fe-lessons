import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTodoById } from "../entities/todo/model/selectors/selectById";
import { Box, Typography, Paper } from "@mui/material";

const Todo = () => {
    let params = useParams();

    if (!params.id) return null;

    const todo = useSelector(selectTodoById(params.id));

    if (!todo) return <Typography variant="h6">Todo not found</Typography>;

    return (
        <Paper elevation={3} sx={{ p: 2, maxWidth: 400, margin: "20px auto" }}>
            <Typography variant="h5" gutterBottom>
                {todo.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {todo.description}
            </Typography>
            <Box mt={2}>
                <Typography variant="body2">
                    Created at: {new Date(todo.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                    Updated at: {new Date(todo.updatedAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                    Status: {todo.completed ? "Completed" : "Not completed"}
                </Typography>
            </Box>
        </Paper>
    );
};

export default Todo;
