import Grid from "@mui/material/Grid2";

import TodoItem from "./TodoItem.tsx";
import {todosSelector} from "../model/selectors/todosSelector.ts";

import {TTodoItem} from "../model/todoItem.type.ts";
import useTodosStore from "../model/todoStore.ts";



const TodoList = () => {

    const arrayTodos:TTodoItem[] = useTodosStore(todosSelector);

    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {arrayTodos.map((value, index) => {
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