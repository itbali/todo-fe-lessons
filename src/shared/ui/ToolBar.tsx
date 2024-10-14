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
import {Help, Home, Person} from "@mui/icons-material";
import {Routes} from "../constants/routes.ts";

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
    const todos = useSelector(selectTodos)
    const user = useSelector(selectUser)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to={Routes.About}>
                        <IconButton style={{color: 'white'}}><Help/></IconButton>
                    </NavLink>
                    <NavLink to={Routes.Home}>
                        <IconButton style={{color: 'white'}}><Home/></IconButton>
                    </NavLink>
                    <NavLink to={Routes.Profile}>
                        <IconButton style={{color: 'white'}}><Person/></IconButton>
                    </NavLink>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {user ? `TOTAL TODOS: ${todos.filter(t => !t.completed).length}` : "TODO-VI"}
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};
