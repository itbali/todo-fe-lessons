import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useSelector} from "react-redux";
import {selectUser} from "../../entities/user/model/userSlice.ts";
import {NavLink} from "react-router-dom";
import {DarkMode, Help, Home, LightMode, Person} from "@mui/icons-material";
import {Routes} from "../constants/routes.ts";
import {Button} from "@mui/material";
import {useThemeStore} from "../../app/themeContext.tsx";
import {selectQueryTodos} from "../../entities/todo/model/selectors/selectQueryTodos.ts";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const ToolBar = () => {
    const {data: todos} = useSelector(selectQueryTodos)
    const user = useSelector(selectUser)

    const {theme, setTheme} = useThemeStore()
    const themeHandler = () => {
        setTheme('dark')
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={Routes.About} style={({isActive}) => ({
                        background: isActive ? 'rgba(255, 255, 255, 0.3)' : '',
                        borderRadius: isActive ? '50%' : ''
                    })}>
                        <IconButton style={{color: 'white'}}><Help/></IconButton>
                    </NavLink>
                    <NavLink to={Routes.Home} style={({isActive}) => ({
                        background: isActive ? 'rgba(255, 255, 255, 0.3)' : '',
                        borderRadius: isActive ? '50%' : ''
                    })}>
                        <IconButton style={{color: 'white'}}><Home/></IconButton>
                    </NavLink>
                    <NavLink to={Routes.Profile} style={({isActive}) => ({
                        background: isActive ? 'rgba(255, 255, 255, 0.3)' : '',
                        borderRadius: isActive ? '50%' : ''
                    })}>
                        <IconButton style={{color: 'white'}}><Person/></IconButton>
                    </NavLink>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {user ? `TOTAL TODOS: ${todos?.filter(t => !t.completed).length}` : "TODO-VI"}
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {user && `HELLO, ${user.username.toUpperCase()}!`}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                        />
                    </Search>
                    <Button variant={'contained'} onClick={themeHandler}>
                        {theme === 'light' ? <LightMode/> : <DarkMode/>}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
