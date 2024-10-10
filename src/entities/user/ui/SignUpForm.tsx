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



const SignUpForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [_isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState(false);

    const [registration, setRegistration] = useState<boolean>(false)


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkLogin = async () => {
        try {
            const response = await axiosBase.post('auth/login', {username, password})

            response.status === 201 ? setIsLoggedIn(true) : setIsLoggedIn(false);
            response.status === 200 ? setIsLoggedIn(true) : setIsLoggedIn(false);

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

            response.status === 201 ? setRegistration(true) : setRegistration(false);

            if (response.status === 409) {
                throw Error('Status Code 409\nThis user already exists!');
            } else if (response.status === 404) {
                throw Error('Status Code 404\nThe page was not found.');
            }
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
    );
};

export default SignUpForm;