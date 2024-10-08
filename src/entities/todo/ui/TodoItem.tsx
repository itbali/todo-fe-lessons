import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {todoType} from "../model/todoType.ts";

type todoItemProps = {
    value: todoType,
    index: number,
    todoDelete: (id: string) => void,
    setArrayTodo: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoItem = ({value, index, todoDelete, setArrayTodo}: todoItemProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

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
                            todoDelete(value._id)
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
                            setArrayTodo((arrayTodo) => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                return arrayTodo.map((item, ind) => {
                                    if (ind === index) {
                                        return {...item, completed: !item.completed}
                                    } else {
                                        return item
                                    }
                                })
                            })
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