import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/TTodoItem.ts";
import useTodosStore from "../model/todoStore.ts";

type todoItemProps = {
    value: TTodoItem,
    index: number
}

const TodoItem = ({value, index}: todoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};
    const updateTodo = useTodosStore((state) => state.updateTodo);
    const deleteTodo = useTodosStore((state) => state.deleteTodo);

    return (
        <Grid size={2} key={value._id}>
            <Card sx={{width: 'max-content'}}>
                <CardContent>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {index + 1}
                    </Typography>
                    <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                        {/*<Button>{<ModeEditOutlineIcon/>}</Button>*/}
                        <Button onClick={() => {
                            deleteTodo(value._id)
                        }}>{<DeleteIcon/>}</Button>
                    </Typography>
                    <Typography sx={{color: 'text.secondary', mb: 1.5}}>{value._id}</Typography>
                    <Typography variant="h5" component="div">
                        {value.title}
                    </Typography>
                    <Typography variant="body2">
                        {value.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <div>
                        <Button size="small" onClick={() => {
                            updateTodo({...value, completed: !value.completed})
                        }}
                        >{value.completed ? 'Success' : 'Todo'}
                            {<Checkbox {...label} checked={value.completed}/>}</Button>
                    </div>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default TodoItem;