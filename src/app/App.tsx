import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, ButtonGroup, Container, TextField} from "@mui/material";
import {ToolBar} from "../shared/ui/ToolBar.tsx";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {axiosBase} from "../shared/util/axios.ts";


import AddIcon from '@mui/icons-material/Add';

import {testTodo} from "../entities/todo/model/todoArray.ts";
import TodoList from "../entities/todo/ui/TodoList.tsx";
import useTodosStore, {TodoState} from "../entities/todo/model/todoStore.ts";


function App() {
    // consts Form Sign Up
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [registration, setRegistration] = useState<boolean>(false)

    // consts Password
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // consts Card

    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const [arrayTodo] = useState(testTodo);

    // functions
    const checkLogin = async () => {
        try {
            const response = await axiosBase.post('auth/login', {username, password})

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            response.status === 201 ? setIsLoggedIn(true) : setIsLoggedIn(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            response.status === 200 ? setIsLoggedIn(true) : setIsLoggedIn(false);

            // Errors
            if (response.status === 401) {
                throw Error('Status Code 401\nThis user does not exist!');
            } else if (response.status === 404) {
                throw Error('Status Code 404\nThe page was not found.');
            }
            console.log(response.status)
        } catch (e) {
            console.warn(e)
        }
    }

    const checkRegistration = async () => {
        try {
            const response = await axiosBase.post('auth/register', {username, password})

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            response.status === 201 ? setRegistration(true) : setRegistration(false);

            // Errors
            if (response.status === 409) {
                throw Error('Status Code 409\nThis user already exists!');
            } else if (response.status === 404) {
                throw Error('Status Code 404\nThe page was not found.');
            }
        } catch (e) {
            console.warn(e)
        }
    }

    const checkLogout = () => {
        setIsLoggedIn(false);
        setRegistration(false);
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
                ? // Button Logout
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
                    {/* Card */}
                    <TodoList />
                </>
                : // Form Sign Up
                <Container maxWidth="sm">
                    <Typography variant="h4" width={'100%'} textAlign={'center'}>
                        Sign up
                    </Typography>
                    {/* Input User */
                    }
                    <TextField
                        value={username}
                        label="Login"
                        type={'email'}
                        fullWidth={true}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                    {/* Input Password */
                    }
                    <FormControl sx={{width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {/* Buttons */
                    }
                    <ButtonGroup fullWidth={true}>
                        {/* Button Login */}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                checkLogin()
                            }}
                        >
                            Login
                        </Button>
                        {/* Button Registration */}
                        {!registration
                            ? <Button variant="outlined" onClick={() => {
                                checkRegistration()
                            }}
                            >Registration
                            </Button>
                            : <Button variant="outlined" disabled={true}
                            >Success!
                            </Button>
                        }
                    </ButtonGroup>
                </Container>
            }
        </>
    )
}

export default App
