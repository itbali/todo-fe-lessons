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
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../shared/constants/routes.ts";
import {useSnackbar} from "notistack";
import {useChangeTodosMutation, useDeleteTodosMutation, useUpdateTodosMutation} from "../api/todosApi.ts";

type TTodoItemProps = {
    value: TTodoItem;
    index: number;
}

const TodoItem = ({value, index}: TTodoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [deleteTodo, {data, isLoading, isSuccess}] = useDeleteTodosMutation()
    const [updateTodo] = useUpdateTodosMutation()
    const [changeTodo] = useChangeTodosMutation()

    const [changeTitle, setChangeTitle] = useState<string>('New Title')
    const [changeDescription, setChangeDescription] = useState<string>('New description...')
    const [change, setChange] = useState<boolean>(false)

    const handleTodoClick = () => {
        navigate(Routes.TodoItem + value._id)
    }

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar(`The ToDo ${data.title} has been deleted`, {variant: 'success'})
        }
    }, [data?.title, enqueueSnackbar, isSuccess]);

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <Grid size={4} key={value._id}>
            <Card sx={{border: '1px solid grey', width: 'max-content'}}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {index + 1}
                    </Typography>
                    <ButtonGroup fullWidth={true} variant={'text'}>
                        <Button onClick={() => setChange(!change)}>{<ModeEditOutlineIcon/>}</Button>
                        <Button onClick={() => {
                            deleteTodo(value._id)
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
                                changeTodo({id: value._id, title: changeTitle, description: changeDescription})
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
                        <Button disabled={isLoading} size="small" onClick={() => {
                            updateTodo({
                                id: value._id,
                                completed: !value.completed,
                            })
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