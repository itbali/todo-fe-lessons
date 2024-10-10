import {TodoState} from "../todoSlice.ts";
import {TTodoItem} from "../todoItem.type.ts";

export const todosSelector : (state : TodoState) => TTodoItem[] = (state:TodoState) => {return state.todos}