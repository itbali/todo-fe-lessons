import {useState} from "react";

import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {Button, ButtonGroup, Container, TextField} from "@mui/material";

import { useDispatch} from 'react-redux'

import {axiosBase} from "../../../shared/util/axios.ts";
import {setIsLoggedIn, setUser} from "../model/userSlice.ts";

const SignUpForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState(false);
    const [registration, setRegistration] = useState<boolean>(false)

    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkLogin = async () => {
        try {
            const response = await axiosBase.post<{access_token:string, username: string}>('auth/login', {username, password})

            if(response.status === 201 || response.status === 200){
                dispatch(setUser(response.data))
                dispatch(setIsLoggedIn(true))
            }else{
                dispatch(setIsLoggedIn(false))
            }


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