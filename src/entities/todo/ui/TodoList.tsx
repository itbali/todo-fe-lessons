import Grid from "@mui/material/Grid2";
import {todoType} from "../model/todoType.ts";
import React from "react";
import TodoItem from "./TodoItem.tsx";

type todoProps = {
    arrayTodo: todoType[],
    setArrayTodo: React.Dispatch<React.SetStateAction<boolean>>,
    todoDelete: (id: string) => void
}

const TodoList = (props: todoProps) => {
    const {arrayTodo, todoDelete, setArrayTodo} = props;

    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {arrayTodo.map((value, index) => {
                return <TodoItem
                    key={value._id}
                    value={value}
                    index={index}
                    todoDelete={todoDelete}
                    setArrayTodo={setArrayTodo}/>
            })}
        </Grid>
    );
};

export default TodoList;