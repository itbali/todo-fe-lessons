import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TodoList from "../entities/todo/ui/TodoList.tsx";
import {useState} from "react";

function App() {
    const [addTodoView, setAddTodoView] = useState<boolean>(false)

    return (
        <>
            <Button variant={'outlined'} fullWidth={true} onClick={() => {
                setAddTodoView(!addTodoView)
            }}>{<AddIcon/>} Add Todo
            </Button>
            <TodoList/>
        </>
    )
}

export default App
