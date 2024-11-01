import {ChangeEvent, memo} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Button, ButtonGroup, CircularProgress, TextField} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import {TTodoItem} from "../model/todoItem.type.ts";
import CustomButton from "../../../shared/ui/kit/CustomButton.tsx";
import CustomIconButton from "../../../shared/ui/kit/IconButton.tsx";

type TTodoItemProps = {
    value: TTodoItem;
    index: number;
    label?: { inputProps: { 'aria-label': string } };
    handleTodoClick: () => void;
    handleTodoDelete: () => void;
    handleUpdateTodo: () => void;
    handleChangeTodo: () => void;
    change: boolean;
    handleSetChange: () => void;
    formatedCreateDate: string;
    formattedUpdateDate: string;
    isLoading?: boolean;
    changedTitle: string;
    handleChangeTitle: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    changedDescription: string
    handleChangeDescription: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TodoItem = ({
                      value,
                      index,
                      label,
                      handleTodoClick,
                      handleTodoDelete,
                      handleSetChange,
                      change,
                      formatedCreateDate,
                      formattedUpdateDate,
                      isLoading,
                      handleUpdateTodo,
                      handleChangeTodo,
                      handleChangeTitle,
                      changedTitle,
                      changedDescription,
                      handleChangeDescription,
                  }: TTodoItemProps) => {

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
                        <CustomIconButton iconName={'edit'} onClick={handleSetChange}></CustomIconButton>
                        <CustomIconButton iconName={'delete'} onClick={handleTodoDelete}></CustomIconButton>
                    </ButtonGroup>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={change ? {display: 'none'} : {display: 'block'}}
                    >
                        {value.title}
                    </Typography>
                    <TextField
                        value={changedTitle}
                        type={'text'}
                        size={'small'}
                        sx={change ? {display: 'block'} : {display: 'none'}}
                        onChange={handleChangeTitle}
                    >
                    </TextField>
                    <Typography variant="body1" sx={change ? {display: 'none'} : {display: 'block'}}>
                        {value.description}
                    </Typography>
                    <br/>
                    <Typography variant={'body2'}>
                        Created {formatedCreateDate}
                    </Typography>
                    <Typography variant={'body2'}>
                        Updated {formattedUpdateDate}
                    </Typography>
                    <TextField
                        value={changedDescription}
                        type={'text'}
                        size={'small'}
                        sx={change ? {display: 'block'} : {display: 'none'}}
                        onChange={handleChangeDescription}
                    >
                    </TextField>
                    <ButtonGroup fullWidth={true}>
                        <Button
                            variant={'outlined'}
                            sx={change ? {display: 'block'} : {display: 'none'}}
                            onClick={handleChangeTodo}
                        >Save
                        </Button>
                        <Button
                            variant={'outlined'}
                            sx={change ? {display: 'block'} : {display: 'none'}}
                            onClick={handleSetChange}
                        >Cancel
                        </Button>
                    </ButtonGroup>
                </CardContent>
                <CardActions>
                    <div>
                        <Button disabled={isLoading} size="small"
                                onClick={handleUpdateTodo}>{value.completed ? 'Success' : 'Todo'}
                            {<Checkbox {...label} checked={value.completed} disabled={isLoading}/>}</Button>
                    </div>
                </CardActions>
                {/*<Button onClick={handleTodoClick}>More detailed</Button>*/}
                <CustomButton onClick={handleTodoClick}>More detailed</CustomButton>
            </Card>
        </Grid>
    );
};

export default memo(TodoItem);