import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, ButtonGroup, CircularProgress, TextField} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/todoItem.type.ts";
import {useDispatch} from "react-redux";
import {setUpdateTodo} from "../model/todoSlice.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../shared/constants/routes.ts";
import {axiosBase} from "../../../shared/util/axios.ts";
import {useSnackbar} from "notistack";

type TTodoItemProps = {
    value: TTodoItem;
    index: number;
    getTodos: () => void;
}

const TodoItem = ({value, index, getTodos}: TTodoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [changeTitle, setChangeTitle] = useState<string>('New Title')
    const [changeDescription, setChangeDescription] = useState<string>('New description...')
    const [change, setChange] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const handleTodoClick = () => {
        navigate(Routes.TodoItem + value._id)
    }

    const handleDeleteTodo = () => {
        setIsDeleting(true)
        axiosBase.delete<TTodoItem[]>(`/todos/${value._id}/`).then(response => {
            getTodos()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            enqueueSnackbar(`ToDo ${response.data.title} was deleted`, {
                variant: 'success',
                autoHideDuration: 3000
            })
        }).catch((e) => {
            enqueueSnackbar(`Error: ${e}`, {
                variant: 'error',
                autoHideDuration: 3000
            })
        }).finally(() => {
            setIsDeleting(false)
        })
    }

    if (isDeleting) {
        return <CircularProgress/>
    }

    return (
        <Grid size={2} key={value._id}>
            <Card sx={{border: '1px solid grey', width: 'max-content'}}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {index + 1}
                    </Typography>
                    <ButtonGroup fullWidth={true} variant={'text'}>
                        <Button onClick={() => setChange(!change)}>{<ModeEditOutlineIcon/>}</Button>
                        <Button onClick={() => {
                            handleDeleteTodo()
                        }}>{<DeleteIcon/>}</Button>
                    </ButtonGroup>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={change ? {display: 'none'} : {display: 'block'}}
                    >
                        {value.title}
                    </Typography>
                    <TextField
                        value={changeTitle}
                        type={'text'}
                        size={'small'}
                        sx={change ? {display: 'block'} : {display: 'none'}}
                        onChange={(e) => {
                            setChangeTitle(e.target.value)
                        }}
                    >
                    </TextField>
                    <Typography variant="body2" sx={change ? {display: 'none'} : {display: 'block'}}>
                        {value.description}
                    </Typography>
                    <TextField
                        value={changeDescription}
                        type={'text'}
                        size={'small'}
                        sx={change ? {display: 'block'} : {display: 'none'}}
                        onChange={(e) => {
                            setChangeDescription(e.target.value)
                        }}
                    >
                    </TextField>
                    <ButtonGroup fullWidth={true}>
                        <Button
                            variant={'outlined'}
                            sx={change ? {display: 'block'} : {display: 'none'}}
                            onClick={() => {
                                dispatch(setUpdateTodo({
                                    ...value,
                                    title: changeTitle, description: changeDescription
                                }))
                                setChangeTitle('New Title')
                                setChangeDescription('New description...')
                                setChange(!change)
                            }}
                        >Save
                        </Button>
                        <Button
                            variant={'outlined'}
                            sx={change ? {display: 'block'} : {display: 'none'}}
                            onClick={() => {
                                setChange(!change)
                            }}
                        >Cancel
                        </Button>
                    </ButtonGroup>
                </CardContent>
                <CardActions>
                    <div>
                        <Button size="small" onClick={() => {
                            dispatch(setUpdateTodo({...value, completed: !value.completed}))
                        }}>{value.completed ? 'Success' : 'Todo'}
                            {<Checkbox {...label} checked={value.completed}/>}</Button>
                    </div>
                </CardActions>
                <Button onClick={handleTodoClick} variant={'contained'} fullWidth={true}>More detailed</Button>
            </Card>
        </Grid>
    );
};

export default TodoItem;