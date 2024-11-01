import TodoItem from "./TodoItem.tsx";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useChangeTodosMutation, useDeleteTodosMutation, useUpdateTodosMutation} from "../api/todosApi.ts";
import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import formateDate from "../../../shared/util/formateDate.ts";
import {TTodoItem} from "../model/todoItem.type.ts";
import {Routes} from "../../../shared/constants/routes.ts";

type TTodoItemContainerProps = {
    value: TTodoItem;
    index: number;
}

const TodoItemContainer = ({value, index}:TTodoItemContainerProps) => {
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [deleteTodo, deleteInfo] = useDeleteTodosMutation()
    const [updateTodo, updateInfo] = useUpdateTodosMutation()
    const [changeTodo, changeInfo] = useChangeTodosMutation()

    const isLoading = deleteInfo.isLoading || updateInfo.isLoading || changeInfo.isLoading

    const [changedTitle, setChangedTitle] = useState<string>('New Title')
    const [changedDescription, setChangedDescription] = useState<string>('New description...')
    const [change, setChange] = useState<boolean>(false)

    const formatedCreateDate = useMemo(()=>formateDate(value.createdAt), [value.createdAt])
    const formattedUpdateDate = useMemo(()=>formateDate(value.updatedAt), [value.updatedAt])

    const handleChangeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setChangedTitle(e.target.value)
        }, []
    )
    const handleChangeDescription = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setChangedDescription(e.target.value)
        }, []
    )

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


    const handleUpdateTodo = () => {
        updateTodo({
            id: value._id,
            completed: !value.completed,
        })
    }
    const handleChangeTodo = () => {
        changeTodo({id: value._id, title: changedTitle, description: changedDescription})
        setChangedTitle('New Title')
        setChangedDescription('New description...')
        handleSetChange()
    }

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

    return (
        <TodoItem
            handleChangeTodo={handleChangeTodo}
            handleUpdateTodo={handleUpdateTodo}
            change={change}
            handleChangeTitle={handleChangeTitle}
            handleTodoClick={handleTodoClick}
            handleTodoDelete={handleTodoDelete}
            handleChangeDescription={handleChangeDescription}
            changedDescription={changedDescription}
            changedTitle={changedTitle}
            handleSetChange={handleSetChange}
            label={label}
            formatedCreateDate={formatedCreateDate}
            formattedUpdateDate={formattedUpdateDate}
            isLoading={isLoading}
            value={value}
            index={index}
        />
    );
};

export default TodoItemContainer;