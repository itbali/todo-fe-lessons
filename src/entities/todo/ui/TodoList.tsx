import Grid from "@mui/material/Grid2";
import TodoItem from "./TodoItem.tsx";
import {useSelector} from "react-redux";
import {selectTodos} from "../model/todoSlice.ts";

const TodoList = () => {
    const todos = useSelector(selectTodos)

    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {todos.map((value, index) => {
                return <TodoItem
                    key={value._id}
                    value={value}
                    index={index}
                />
            })}
        </Grid>
    );
};

export default TodoList;