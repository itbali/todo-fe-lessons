import {useEffect, useState, memo, useMemo, useCallback} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, ButtonGroup, CircularProgress, TextField} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/todoItem.type.ts";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../shared/constants/routes.ts";
import {useSnackbar} from "notistack";
import {useChangeTodosMutation, useDeleteTodosMutation, useUpdateTodosMutation} from "../api/todosApi.ts";
import {formatDistanceToNow} from "date-fns";
import CustomButton from "../../../shared/ui/kit/CustomButton.tsx";
import CustomIconButton from "../../../shared/ui/kit/IconButton.tsx";

type TTodoItemProps = {
    value: TTodoItem;
    index: number;
}

const TodoItem = ({value, index}: TTodoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [deleteTodo, deleteInfo] = useDeleteTodosMutation()
    const [updateTodo, updateInfo] = useUpdateTodosMutation()
    const [changeTodo, changeInfo] = useChangeTodosMutation()

    const [changeTitle, setChangeTitle] = useState<string>('New Title')
    const [changeDescription, setChangeDescription] = useState<string>('New description...')
    const [change, setChange] = useState<boolean>(false)

    const handleTodoClick = useCallback(
        () => {
            navigate(Routes.TodoItem + value._id)
        }, [navigate, value._id]
    )

    const handleTodoDelete = useCallback(
        () => {
            deleteTodo(value._id)
        }, [deleteTodo, value._id]
    )

    const handleSetChange = useCallback(
        () => {
            setChange(!change)
        }, [change]
    )

    // const createDate = new Date(value.createdAt)
    const createDateFormat = useMemo(() => {
        const createDate = new Date(value.createdAt)
        return formatDistanceToNow(createDate, {addSuffix: true})
    }, [value.createdAt])

    // const updateDate = new Date(value.updatedAt)
    const updateDateFormat = useMemo(() => {
        const updateDate = new Date(value.updatedAt)
        return formatDistanceToNow(updateDate, {addSuffix: true})
    }, [value.updatedAt])

    useEffect(() => {
        if (deleteInfo.isSuccess) {
            enqueueSnackbar(`The ToDo ${deleteInfo.data.title} has been deleted`, {variant: 'success'})
        }
    }, [deleteInfo.data?.title, enqueueSnackbar, deleteInfo.isSuccess]);

    useEffect(() => {
        if (changeInfo.isSuccess) {
            enqueueSnackbar('The ToDo has been changed', {variant: 'success'})
        }
    }, [enqueueSnackbar, changeInfo.isSuccess]);

    if (deleteInfo.isLoading) {
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
                        <CustomIconButton iconName={'edit'} onClick={handleSetChange}/>
                        <CustomIconButton iconName={'delete'} onClick={handleTodoDelete}/>
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
                    <Typography variant="body1" sx={change ? {display: 'none'} : {display: 'block'}}>
                        {value.description}
                    </Typography>
                    <br/>
                    <Typography variant={'body2'}>
                        Created {createDateFormat}
                    </Typography>
                    <Typography variant={'body2'}>
                        Updated {updateDateFormat}
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
                        <Button disabled={updateInfo.isLoading} size="small" onClick={() => {
                            updateTodo({
                                id: value._id,
                                completed: !value.completed,
                            })
                        }}>{value.completed ? 'Success' : 'Todo'}
                            {<Checkbox {...label} checked={value.completed} disabled={updateInfo.isLoading}/>}</Button>
                    </div>
                </CardActions>
                {/*<Button onClick={handleTodoClick}>More detailed</Button>*/}
                <CustomButton onClick={handleTodoClick}>More detailed</CustomButton>
            </Card>
        </Grid>
    );
};

export default memo(TodoItem);