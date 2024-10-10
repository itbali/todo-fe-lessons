import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"
import { selectTodos } from "../model/todoSlice.ts"
import TodoItem from "./TodoItem.tsx"

const TodoList = () => {
    const arrayTodos = useSelector(selectTodos)

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {arrayTodos.map((todo, index) => (
                <TodoItem
                    key={todo._id}
                    value={todo}
                    index={index}
                />
            ))}
        </Grid>
    )
}

export default TodoList
