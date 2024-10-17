import Grid from "@mui/material/Grid2";
import TodoItem from "./TodoItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectTodos, setTodos} from "../model/todoSlice.ts";
import {axiosBase} from "../../../shared/util/axios.ts";
import {TTodoItem} from "../model/todoItem.type.ts";
import {useCallback, useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

const TodoList = () => {
    const todos = useSelector(selectTodos)
    const [initial, setInitial] = useState<boolean>(true)

    const dispatch = useDispatch()

    const getTodos = useCallback(() => {
        axiosBase.get<TTodoItem[]>('/todos/').then(response => {
            dispatch(setTodos(response.data))
        }).finally(() => {
            setInitial(false)
        })
    }, [dispatch])

    useEffect(() => {
        getTodos()
    }, [getTodos])

    if (initial && todos.length === 0) {
        return <CircularProgress/>
    }

    if (todos.length === 0) {
        return <Typography>The ToDo list is empty</Typography>
    } else {
        return <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {todos.map((value, index) => {
                return <TodoItem
                    key={value._id}
                    value={value}
                    index={index}
                    getTodos={getTodos}
                />
            })}
        </Grid>
    }
};

export default TodoList;