import Typography from '@mui/material/Typography';
import {Button, Container, TextField} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

import TodoList from "../entities/todo/ui/TodoList.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectTodos, setAddTodo} from "../entities/todo/model/todoSlice.ts";

function App() {
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const dispatch = useDispatch()

    const todos = useSelector(selectTodos)
    const todoSave = () => {
        let createId = todos.length + 1
        while (todos.filter(t => t._id === createId.toString()).length !== 0) {
            createId += 1
        }
        const todoId = createId.toString()
        const add = {
            _id: todoId,
            title: title,
            completed: false,
            description: description,
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        }
        dispatch(setAddTodo(add))
        setTitle('')
        setDescription('')
    }

    return (
        <>
            <Button variant={'outlined'} fullWidth={true} onClick={() => {
                setAddTodoView(addTodoView ? false : true)
            }}>{<AddIcon/>} Add Todo
            </Button>
            {addTodoView ?
                <Container>
                    <Typography variant="h5" sx={{textAlign: 'center'}}>
                        Add TODO
                    </Typography>
                    <TextField
                        size={'small'}
                        value={title}
                        label='Title'
                        type={'text'}
                        fullWidth={true}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                    <br/>
                    <TextField
                        size={'small'}
                        value={description}
                        label='Description'
                        type={'text'}
                        fullWidth={true}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}/>
                    <br/>
                    <Button
                        fullWidth={true}
                        variant="outlined"
                        onClick={() => {
                            todoSave()
                        }}
                    >
                        Save
                    </Button>
                </Container>
                : undefined}
            <TodoList/>
        </>
    )
}

export default App
