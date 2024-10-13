import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, TextField} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/todoItem.type.ts";
import {useDispatch} from "react-redux";
import {setDeleteTodo, setUpdateTodo} from "../model/todoSlice.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type TTodoItemProps = {
    value: TTodoItem,
    index: number;
}

const TodoItem = ({value, index}: TTodoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const dispatch = useDispatch()

    const [changeTitle, setChangeTitle] = useState<string>('New Title')
    const [changeDescription, setChangeDescription] = useState<string>('New description...')
    const [change, setChange] = useState<boolean>(false)

    const navigate = useNavigate()
    const handleTodoClick = () => {
        navigate(`/todo/${value._id}/`)
    }

    return (
        <Grid size={2} key={value._id}>
            <Card sx={{border: '1px solid grey', width: 'max-content'}}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {index + 1}
                    </Typography>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14, float: 'right'}}>
                        <Button onClick={() => setChange(!change)}>{<ModeEditOutlineIcon/>}</Button>
                        <Button onClick={() => {
                            dispatch(setDeleteTodo({...value, _id: value._id}))
                        }}>{<DeleteIcon/>}</Button>
                    </Typography>
                    <Typography sx={{color: 'text.secondary', mb: 1.5}}>ID: {value._id}</Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={change ? {display: 'none'} : {display: 'block'}}
                        onClick={handleTodoClick}
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
                </CardContent>
                <CardActions>
                    <div>
                        <Button size="small" onClick={() => {
                            dispatch(setUpdateTodo({...value, completed: !value.completed}))
                        }}>{value.completed ? 'Success' : 'Todo'}
                            {<Checkbox {...label} checked={value.completed}/>}</Button>
                    </div>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default TodoItem;