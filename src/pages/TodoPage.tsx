import {useNavigate, useParams} from "react-router-dom";
import {selectTodoById} from "../entities/todo/model/selectors/selectById.ts";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";

const TodoPage = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const params = useParams();
    const todo = useSelector(selectTodoById(params.id))
    if (!todo) return <div>ToDo not found</div>;

    return (
        <div>
            {JSON.stringify(todo)}
            <br/>
            <Button onClick={goBack} variant={'outlined'}>Go back</Button>
        </div>
    );
};

export default TodoPage;