import Typography from '@mui/material/Typography';
import {Button, Container, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TodoList from "../entities/todo/ui/TodoList.tsx";
import {useEffect, useState} from "react";
import {useCreateTodosMutation} from "../entities/todo/api/todosApi.ts";
import {enqueueSnackbar} from "notistack";

function App() {
    const [title, setTitle] = useState<string>('')
    const [addTodoView, setAddTodoView] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const [addTodo, {isLoading, isSuccess, data}] = useCreateTodosMutation()

    const todoSave = () => {
        addTodo({title, description})
        setTitle('')
        setDescription('')
    }

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar(`The ToDo ${data.title} has been added`, {variant: 'success'})
        }
    }, [data?.title, enqueueSnackbar, isSuccess]);

    return (
        <>
            <Button variant={'outlined'} fullWidth={true} onClick={() => {
                setAddTodoView(addTodoView ? false : true)
            }}>{<AddIcon/>} Add Todo
            </Button>
            {addTodoView ?
                <Container>
                    <Typography variant="h5" sx={{textAlign: 'center'}}>
                        Add TODO
                    </Typography>
                    <TextField
                        size={'small'}
                        value={title}
                        label='Title'
                        type={'text'}
                        fullWidth={true}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}/>
                    <br/>
                    <TextField
                        size={'small'}
                        value={description}
                        label='Description'
                        type={'text'}
                        fullWidth={true}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}/>
                    <br/>
                    <Button
                        disabled={isLoading}
                        fullWidth={true}
                        variant="outlined"
                        onClick={() => {
                            todoSave()
                        }}
                    >
                        Save
                    </Button>
                </Container>
                : undefined}
            <TodoList/>
        </>
    )
}

export default App
