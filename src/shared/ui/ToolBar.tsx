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
import {selectTodos} from "../../entities/todo/model/todoSlice.ts";
import {NavLink} from "react-router-dom";
import {Help} from "@mui/icons-material";

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

type TTollbarProps = {
    isLoggedIn: boolean,
}

export const ToolBar = ({isLoggedIn}: TTollbarProps) => {
    const todos = useSelector(selectTodos)
    const user = useSelector(selectUser)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    edge="start"*/}
                    {/*    color="inherit"*/}
                    {/*    aria-label="open drawer"*/}
                    {/*    sx={{mr: 2}}*/}
                    {/*>*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}
                    <NavLink to={'/about/'}>
                        <IconButton style={{color: 'white'}}><Help/></IconButton>
                    </NavLink>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {isLoggedIn ? `TOTAL TODOS: ${todos.filter(t => !t.completed).length}` : "TODO-VI"}
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {user && `HELLO, ${user.toUpperCase()}!`}
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};
