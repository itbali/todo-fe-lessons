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
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required().min(6),
        repeatPassword: yup.string().oneOf([yup.ref('password'), ''], 'passwords don\'t match')
            .required('repeat the password is a required field'),
    })
    .required()

type TFormData = yup.InferType<typeof schema>

const RegistrationForm = () => {
    const [registration, setRegistration] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState(false);

    const {enqueueSnackbar} = useSnackbar()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {register, handleSubmit, formState: {errors}} = useForm<TFormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const checkRegistration = async (data: { username: string, password: string }) => {
        setRegistration(true)

        try {
            const response = await axiosBase.post('auth/register', {username: data.username, password: data.password})

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
            enqueueSnackbar('This user already exists!', {variant: 'error'})
            setRegistration(false)
        }
    }

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(checkRegistration)}>
                <Typography variant="h4" width={'100%'} textAlign={'center'}>
                    Sign up
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
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Repeat the password</InputLabel>
                    <OutlinedInput
                        {...register("repeatPassword")}
                        error={!!errors.repeatPassword}
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
                    {!!errors.repeatPassword &&
                        <Typography
                            fontSize={'small'}
                            color={'red'}
                        >
                            {errors.repeatPassword?.message}
                        </Typography>
                    }
                </FormControl>
                <Button
                    disabled={!!errors.username || !!errors.password || registration || !!errors.repeatPassword}
                    fullWidth={true}
                    variant="outlined"
                    type={'submit'}
                >
                    Registration
                </Button>
            </form>
        </Container>
    );
};

export default RegistrationForm;