import {useState} from 'react'

import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import {Button, Container, TextField} from "@mui/material";

import {ToolBar} from "../shared/ui/ToolBar.tsx";

import TodoList from "../entities/todo/ui/TodoList.tsx";
import {testTodo} from "../entities/todo/model/todoArray.ts";
import useTodosStore, {TodoState} from "../entities/todo/model/todoStore.ts";

import SignUpForm from "../entities/user/ui/SignUpForm.tsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [arrayTodo] = useState(testTodo);

    const checkLogout = () => {
        setIsLoggedIn(false);
       // setRegistration(false);
    }

    const addTodo = useTodosStore((state:TodoState) => state.addTodo)
    const todos = useTodosStore(state => state.todos)

    const todoSave = () => {
        const add = {
            _id: `id${todos.length + 1}`,
            title: title,
            completed: false,
            description: description,
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        }

        addTodo(add)
    }


    return (
        <>
            <ToolBar amount={arrayTodo.length} isLoggedIn={isLoggedIn}/>
            {isLoggedIn
                ?
                <>
                    <Button
                        variant="outlined"
                        fullWidth={true}
                        onClick={() => {
                            checkLogout()
                        }}>Logout</Button>
                    <Button onClick={() => {
                        addTodoView ? setAddTodoView(false) : setAddTodoView(true)
                    }}>{<AddIcon/>} Add Todo</Button>
                    {addTodoView ? <Container>
                        <Typography variant="h5">
                            Add TODO
                        </Typography>
                        <TextField
                            size={'small'}
                            value={title}
                            label='Title'
                            type={'text'}
                            fullWidth={false}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                        <br/>
                        <TextField
                            size={'small'}
                            value={description}
                            label='Description'
                            type={'text'}
                            fullWidth={false}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}/>
                        <br/>
                        <Button
                            fullWidth={false}
                            variant="outlined"
                            onClick={() => {
                                todoSave()
                            }}
                        >
                            Save
                        </Button>
                    </Container> : undefined}
                    <TodoList />
                </>
                :
                <SignUpForm/>
            }
        </>
    )
}

export default App
