import Typography from "@mui/material/Typography";
import {Button, Container, TextField} from "@mui/material";
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
import {useForm} from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required().min(6),
    })
    .required()

type TFormData = yup.InferType<typeof schema>

const LoginForm = () => {
    // const [username, setUsername] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    const [disabledButton, setDisabledButton] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<TFormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const checkLogin = async (data: {username: string, password: string}) => {
        setDisabledButton(true)

        try {
            const response = await axiosBase.post<{ access_token: string, username: string }>
            ('/auth/login/', {username: data.username, password: data.password})

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

    return (
        <Container maxWidth="sm">
            <form
                onSubmit={handleSubmit(checkLogin)}
            >
                <Typography variant="h4" width={'100%'} textAlign={'center'}>
                    Login
                </Typography>
                <TextField
                    {...register("username")}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    label="Login"
                    fullWidth={true}
                    />
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        {...register("password")}
                        error={!!errors.password}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
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
                    {!!errors.password &&
                        <Typography
                            fontSize={'small'}
                            color={'red'}
                        >
                            {errors.password?.message}
                        </Typography>
                    }
                </FormControl>
                <Button
                    disabled={disabledButton || !!errors.username || !!errors.password}
                    fullWidth={true}
                    type={'submit'}
                    variant="outlined"
                >
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginForm;