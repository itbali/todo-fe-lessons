import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { Button, Container, TextField } from '@mui/material'

import { ToolBar } from '../shared/ui/ToolBar.tsx'
import TodoList from '../entities/todo/ui/TodoList.tsx'
import { addTodo, selectTodos } from '../entities/todo/model/todoSlice.ts'
import SignUpForm from '../entities/user/ui/SignUpForm.tsx'
import { logout, selectIsLoggedIn } from '../entities/user/model/userSlice.ts'

function App() {
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todos = useSelector(selectTodos)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleAddTodo = () => {
        const newTodo = {
            id: `id${todos.length + 1}`,
            title,
            completed: false
        }

        dispatch(addTodo(newTodo))
        setTitle('')
        setDescription('')
        setAddTodoView(false)
    }

    return (
        <>
            <ToolBar />
            {isLoggedIn ? (
                <>
                    <Button
                        variant="outlined"
                        fullWidth={true}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Button onClick={() => setAddTodoView(!addTodoView)}>
                        <AddIcon /> Add Todo
                    </Button>
                    {addTodoView && (
                        <Container>
                            <Typography variant="h5">Add TODO</Typography>
                            <TextField
                                size="small"
                                value={title}
                                label="Title"
                                fullWidth={false}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <TextField
                                size="small"
                                value={description}
                                label="Description"
                                fullWidth={false}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />
                            <Button
                                fullWidth={false}
                                variant="outlined"
                                onClick={handleAddTodo}
                            >
                                Save
                            </Button>
                        </Container>
                    )}
                    <TodoList />
                </>
            ) : (
                <SignUpForm />
            )}
        </>
    )
}

export default App
