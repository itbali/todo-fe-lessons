import {useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, Container, TextField} from "@mui/material";
import {ToolBar} from "../shared/ui/ToolBar.tsx";
import AddIcon from '@mui/icons-material/Add';
import TodoList from "../entities/todo/ui/TodoList.tsx";
import SignUpForm from "../entities/user/ui/SignUpForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsLoggendIn} from "../entities/user/model/userSlice.ts";
import {selectTodos, setAddTodo} from "../entities/todo/model/todoSlice.ts";

function App() {
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')


    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggendIn)

    const checkLogout = () => {
        dispatch(logout())
    }

    const todos = useSelector(selectTodos)

    const todoSave = () => {
        let createId: string = String(todos.length + 1);
        while(todos.filter(t => t._id === createId).length !== 0){
            createId += 1
        }

        const add = {
            _id: `id${todos.length + 1}`,
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
            <ToolBar isLoggedIn={isLoggedIn}/>
            {isLoggedIn
                ?
                <>
                    <Button
                        variant="outlined"
                        fullWidth={true}
                        onClick={() => {
                            checkLogout()
                        }}>Logout</Button>
                    {/* Form add ToDo */}
                    <Button onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
                : <SignUpForm />
            }
        </>
    )
}

export default App
