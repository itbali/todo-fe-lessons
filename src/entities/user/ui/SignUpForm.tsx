import Typography from "@mui/material/Typography";
import {Button, ButtonGroup, Container, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from "react";
import {axiosBase} from "../../../shared/util/axios.ts";

import {useDispatch} from 'react-redux'
import {setIsLoggedIn, setUser} from "../model/userSlice.ts";

const SignUpForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [registration, setRegistration] = useState<boolean>(false)
    const [disabledButton, setDisabledButton] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const dispatch = useDispatch()

    const checkLogin = async () => {
        setDisabledButton(true)
        try {
            const response = await axiosBase.post<{ access_token: string, username: string }>
            ('/auth/login/', {username, password})

            if (response.status === 201 || response.status === 200) {
                dispatch(setIsLoggedIn(true))
                dispatch(setUser(response.data))
                localStorage.setItem('token', response.data.access_token)
            } else {
                setDisabledButton(false)
                dispatch(setIsLoggedIn(false))
            }

            if (response.status === 401) {
                throw Error('Status Code 401. This user does not exist!');
            } else if (response.status === 404) {
                throw Error('Status Code 404. The page was not found.');
            }

            console.log(response.status)
        } catch (e) {
            console.warn(e)
        }
    }

    const checkRegistration = async () => {
        try {
            const response = await axiosBase.post('auth/register', {username, password})

            if (response.status === 201 || response.status === 200) {
                setRegistration(true)
            } else {
                setRegistration(false)
            }

            if (response.status === 409) {
                throw Error('Status Code 409. This user already exists!');
            } else if (response.status === 404) {
                throw Error('Status Code 404. The page was not found.');
            }

            console.log(response.status)
        } catch (e) {
            console.warn(e)
        }
    }

    return (
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
                    disabled={disabledButton}
                    variant="outlined"
                    onClick={() => {
                        checkLogin()
                    }}
                >
                    Login
                </Button>
                {!registration ?
                    <Button variant="outlined" disabled={disabledButton} onClick={() => {
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
    );
};

export default SignUpForm;