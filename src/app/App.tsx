import {useState} from 'react'
import Typography from '@mui/material/Typography';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Input,
  InputLabel
} from "@mui/material";
import {ToolBar} from "../shared/ui/ToolBar.tsx";
import {axiosBase} from "../shared/util/axiosBase.ts";
import Grid from '@mui/material/Grid2';
import Checkbox from '@mui/material/Checkbox';
import {Visibility, VisibilityOff} from '@mui/icons-material';


function App() {
  const todo1 = {
    _id: "1",
    title: "string1",
    completed: true,
    description: "string",
    createdAt: "2024-08-21T12:00:00Z",
    updatedAt: "2024-08-21T12:00:00Z"
  }

  const todo2 = {
    _id: "2",
    title: "string2",
    completed: false,
    description: "string",
    createdAt: "2024-08-21T12:00:00Z",
    updatedAt: "2024-08-21T12:00:00Z"
  }

  const initialTodoArray = [todo1, todo2, todo2, todo1]
  const [todoArray, setTodoArray] = useState(initialTodoArray)

  const [newTodoTitle, setNewTodoTitle] = useState<string>("")
  const [newTodoDescription, setNewTodoDescription] = useState<string>("")

  const addTodoHandler = () => {
    const newTodo = {
      _id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodoArray([...todoArray, newTodo]);
    setNewTodoTitle("");
    setNewTodoDescription("");
  }

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginHandler = async () => {
    setIsFetching(true)
    try {
      const response = await axiosBase.post('auth/login', {
        username,
        password,
      })

      if (response.status === 401) {
        throw Error("NOT AUTHORIZED")
      } else {
        setIsLoggedIn(true)
      }
    } catch (e) {
      console.warn(e)
    } finally {
      setIsFetching(false)
    }
  }

  const registerHandler = () => {
    setIsFetching(true)
    fetch('https://todos-be.vercel.app/auth/register', {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        ["Content-Type"]: "application/json"
      }
    }).then(r => {
      r.json().then(() => {
        setIsFetching(false)
      })
    }).finally(() => {
      setIsFetching(false)
    })
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  return (
      <>
        <ToolBar/>
        {isLoggedIn
            ? <>
              <Grid container spacing={2}>
                {todoArray.map((todo, index) => {
                  return <Grid size={3}>
                    <Card>
                      <CardHeader title={todo.title} subheader={todo.description}/>
                      <CardContent>
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => {
                              setTodoArray(todoArray.map((todo, i) => {
                                if (i === index) {
                                  return {...todo, completed: !todo.completed}
                                }
                                return todo
                              }))
                            }}
                        />
                        <Typography>{todo.completed ? "Done" : "Tood"}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                })}

              </Grid>
              <Container maxWidth="sm">
                <Typography variant="h5" textAlign="center">Add New Todo</Typography>
                <TextField
                    label="Title"
                    fullWidth
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    value={newTodoDescription}
                    onChange={(e) => setNewTodoDescription(e.target.value)}
                />

                <Button fullWidth onClick={addTodoHandler}>Add Todo</Button>
              </Container>
              <Button fullWidth onClick={logoutHandler}>Logout</Button>
            </>
            : <Container maxWidth="sm">
              <Typography variant="h5" width="100%" textAlign="center">Sign Up</Typography>
              <TextField
                  label="login"
                  variant="standard"
                  fullWidth
                  size="small"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isFetching}
              />
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isFetching}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                />
              </FormControl>
              <ButtonGroup fullWidth>
                <Button
                    onClick={registerHandler}
                    disabled={isFetching}
                >Register</Button>
                <Button
                    onClick={loginHandler}
                    disabled={isFetching}
                >Login</Button>
              </ButtonGroup>
            </Container>
        }
      </>
  )
}

export default App