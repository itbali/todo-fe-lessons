import React, {useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, ButtonGroup, Container, TextField} from "@mui/material";
import {ToolBar} from "../shared/ui/tool-bar.tsx";

// ************

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function App() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [login, setLogin] = useState<boolean>(false)
    const [registration, setRegistration] = useState<boolean>(false)
    //const [disabled, setDisabled] = useState<boolean>(false)

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkLogin = async () => {
        const response = await fetch(
            'https://todos-be.vercel.app/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {['content-type']: 'application/json'}
            }
        )
        const data = await response.json()
        console.log(data)

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.status === 201 ? setLogin(true) : setLogin(false);
    }

    const checkRegistration = async () => {
        const response = await fetch(
            'https://todos-be.vercel.app/auth/register',
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {['content-type']: 'application/json'}
            }
        )
        const data = await response.json()
        console.log(data)

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.status === 201 ? setRegistration(true) : setRegistration(false);
    }

    const checkLogout = () => {
        setLogin(false);
        setRegistration(false);
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
                    <ButtonGroup fullWidth={true}>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                checkLogin()
                            }}
                        >
                            Login
                        </Button>
                        {!registration ?
                            <Button variant="outlined" onClick={() => {
                                checkRegistration()
                            }}
                            >Registration
                            </Button>
                            :
                            <Button variant="outlined" disabled={true}
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
