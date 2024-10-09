import Typography from '@mui/material/Typography';
import {Button, ButtonGroup, Container, TextField} from "@mui/material";
import {ToolBar} from "../shared/ui/ToolBar.tsx";

import AddIcon from '@mui/icons-material/Add';

import TodoList from "../entities/todo/ui/TodoList.tsx";
import useTodosStore, {TodoState} from "../entities/todo/model/todoStore.ts";
import SignUpForm from "../entities/user/ui/SignUpForm.tsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsLoggedIn} from "../entities/user/model/userSlice.ts";


function App() {
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const [, setRegistration] = useState<boolean>(false)
    const [, setDisabledButton] = useState<boolean>(false)

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = useDispatch()

    const checkLogout = () => {
        setRegistration(false);
        setDisabledButton(false);
        dispatch(logout())
    }

    const addTodo = useTodosStore((state: TodoState) => state.addTodo)
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
        setTitle('')
        setDescription('')
    }

    return (
        <>
            <ToolBar isLoggedIn={isLoggedIn}/>
            {isLoggedIn ?
                <>
                    <ButtonGroup fullWidth={true}>
                        <Button fullWidth={true} onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            addTodoView ? setAddTodoView(false) : setAddTodoView(true)
                        }}>{<AddIcon/>} Add Todo
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth={true}
                            onClick={() => {
                                checkLogout()
                            }}>Logout
                        </Button>
                    </ButtonGroup>
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
                : <SignUpForm/>
            }
        </>
    )
}

export default App
