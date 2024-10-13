import {useParams} from "react-router-dom";
import {selectTodoById} from "../entities/todo/model/selectors/selectById.ts";
import {useSelector} from "react-redux";

const TodoPage = () => {
    const params = useParams();
    const todo = useSelector(selectTodoById(params.id))
    console.log(todo)
    if (!todo) return <div>ToDo not found</div>;

    return (
        <div>
            {JSON.stringify(todo)}
        </div>
    );
};

export default TodoPage;