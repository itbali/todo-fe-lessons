import {Stack, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import LoginForm from "./LoginForm.tsx";
import RegistrationForm from "./RegistrationForm.tsx";

const LoginRegistrationTabs = () => {
    const [value, setValue] = useState(0)
    const handleTabClick = (_event: unknown, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Stack alignItems={'center'} width={'100%'}>
            <Tabs value={value} onChange={handleTabClick} aria-label="basic tabs example">
                <Tab label="Login" value={0}/>
                <Tab label="Registration" value={1}/>
            </Tabs>
            {value === 0 ? <LoginForm/> : <RegistrationForm/>}
        </Stack>
    );
};

export default LoginRegistrationTabs;