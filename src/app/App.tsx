import {useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, ButtonGroup, Container, TextField} from "@mui/material";
import {ToolBar} from "../shared/ui/tool-bar.tsx";

function App() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<boolean>(false)

    const testUser = 'admin'
    const testPass = '1234'

    const checkLogin = () => {
        setLogin(username === testUser && password === testPass);
    }

    const checkLogout = () => {
        setLogin(false);
    }

    return (
        <>
            <ToolBar/>
            {login ?
                <Button
                    variant="outlined"
                    fullWidth={true}
                    onClick={() => {
                        checkLogout()
                    }}>Logout</Button>
                :
                <Container maxWidth="sm">
                    <Typography variant="h4" width={'100%'} textAlign={'center'}>
                        Sign up
                    </Typography>
                    <TextField
                        value={username}
                        label="Login"
                        type={'email'}
                        fullWidth={true}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                    <TextField
                        value={password}
                        label="Password"
                        type={'password'}
                        fullWidth={true}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    <ButtonGroup fullWidth={true}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                checkLogin()
                            }}
                        >
                            Login
                        </Button>
                        <Button variant="outlined">Registration</Button>
                    </ButtonGroup>
                </Container>
            }
        </>
    )
}

export default App
