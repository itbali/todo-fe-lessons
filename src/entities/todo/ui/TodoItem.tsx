import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/todoItem.type.ts";
import {useDispatch} from "react-redux";
import {setDeleteTodo, setUpdateTodo} from "../model/todoSlice.ts";
import {useNavigate} from "react-router-dom";
import {Routes} from '../../../shared/constants/routes.ts'

type TTodoItemProps = {
    value: TTodoItem,
    index: number;
}

const TodoItem = ({value, index}: TTodoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleTodoClick = () => {
        navigate(Routes.TodoItem+value._id)
    }



    return (
        <Grid size={2} key={value._id}>
            <Card sx={{border: '1px solid grey', width: 'max-content'}}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {index + 1}
                    </Typography>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14, float: 'right'}}>
                        <Button>{<ModeEditOutlineIcon/>}</Button>
                        <Button onClick={() => {
                            dispatch(setDeleteTodo({...value, _id: value._id}))
                        }}>{<DeleteIcon/>}</Button>
                    </Typography>

                    <Typography sx={{color: 'text.secondary', mb: 1.5}}>
                        ID: {value._id}
                    </Typography>

                    <Typography variant="h5" component="div" onClick={handleTodoClick}>
                        {value.title}
                    </Typography>


                    <Typography variant="body2" >
                        {value.description}
                    </Typography>

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