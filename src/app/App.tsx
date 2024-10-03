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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Grid from '@mui/material/Grid2';

function App() {
    // consts Form Sign Up
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<boolean>(false)
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
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const testTodo = [
        {
            _id: "id1",
            title: "title1",
            completed: false,
            description: "description1",
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        },
        {
            _id: "id2",
            title: "title2",
            completed: false,
            description: "description2",
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        }
    ]
    const [arrayTodo, setArrayTodo] = useState(testTodo);

    // functions
    const checkLogin = async () => {
        try {
            const response = await axiosBase.post('auth/login', {username, password})

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            response.status === 201 ? setLogin(true) : setLogin(false);

            // Errors
            if (response.status === 401) {
                throw Error('Status Code 401\nThis user does not exist!');
            } else if (response.status === 404) {
                throw Error('Status Code 404\nThe page was not found.');
            }
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
        setLogin(false);
        setRegistration(false);
    }

    const todoSave = () => {
        const add = {
            _id: `id${arrayTodo.length + 1}`,
            title: title,
            completed: false,
            description: description,
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        }
        const updateArrayTodo = [...arrayTodo, add]
        setArrayTodo(updateArrayTodo)
    }

    const todoDelete = (del: string) => {
        for (const i of arrayTodo) {
            if (i._id == del) {
                const delTodo = [...arrayTodo.slice(0, arrayTodo.indexOf(i)),
                    ...arrayTodo.slice(arrayTodo.indexOf(i) + 1)]
                setArrayTodo(delTodo)
            }
        }
    }

    return (
        <>
            <ToolBar/>
            {login
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
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {arrayTodo.map((value, index) => {
                            return <Grid size={2} key={value._id}>
                                <Card sx={{width: 'max-content'}}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                            {index + 1}
                                        </Typography>
                                        <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                                            <Button>{<ModeEditOutlineIcon/>}</Button>
                                            <Button onClick={() => {
                                                todoDelete(value._id)
                                            }}>{<DeleteIcon/>}</Button>
                                        </Typography>
                                        <Typography sx={{color: 'text.secondary', mb: 1.5}}>{value._id}</Typography>
                                        <Typography variant="h5" component="div">
                                            {value.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {value.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <div>
                                            <Button size="small" onClick={() => {
                                                setArrayTodo(arrayTodo.map((item, ind) => {
                                                    if (ind === index) {
                                                        return {...item, completed: !item.completed}
                                                    } else {
                                                        return item
                                                    }
                                                }))
                                            }}>{value.completed ? 'Success' : 'Todo'}
                                                {<Checkbox {...label} checked={value.completed}/>}</Button>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Grid>
                        })}
                    </Grid>
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
