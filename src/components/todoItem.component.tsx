import { StyleSheet, css } from "aphrodite"
import { Todo } from "../interface/todo"
import commonCss, { borderColor } from "../commonCss"
import { colorByPriority } from "../theme"
import {RiPencilFill} from "react-icons/ri"
import {RiDeleteBin5Fill} from "react-icons/ri"
import {RiArrowRightLine} from "react-icons/ri"
import { useContext, useState } from "react"
import { todoContext } from "../screens/todos/todoPage.component"
import { getDateStringToDisplay, nextStateMapByPrevState } from "../utils/todoUtils"



interface TodoItemProps {
    todo: Todo
}

export const TodoItem = ({todo}: TodoItemProps) => {
    const {deleteTodo, editTodo, moveTodoTo} = useContext(todoContext);
    const [isEditMode, setEditMode] = useState(false);    
    return <div className={css(commonCss.row, commonCss.justifySpaceBetween ,styles.todoItem, borderColor(colorByPriority[todo.priority]))}>
        {todo.status!=="Done"
            ? <div className={css(styles.todoDescription)}>{todo.description}</div>
            : <div className={css(styles.strikeThrough, styles.todoDescription)}>{todo.description}</div>
        }
        <div className={css(commonCss.row)}>
            <div className={css(styles.todoActionIcon, styles.dateTime)}>{getDateStringToDisplay(todo.datetime)}</div>
            {todo.status!=="Done"
                ? <div className={css(styles.todoActionIcon)} onClick={()=> moveTodoTo(todo.id, nextStateMapByPrevState[todo.status])}><RiArrowRightLine/></div>
                : null
            }
            {todo.status!=="Done"
                ? <div className={css(styles.todoActionIcon)} onClick={()=> editTodo(todo.id)}><RiPencilFill/></div>
                : null
            }
            <div className={css(styles.todoActionIcon)} onClick={()=>deleteTodo(todo.id)}><RiDeleteBin5Fill/></div>
        </div>
    </div>
}

const styles = StyleSheet.create({
    todoDescription: {
        width: "55%"
    },
    todoItem: {
        margin: "10px 5px",
        borderLeft: "5px solid",
        padding: "10px",
        backgroundColor: "#f6f6f6",
        borderRadius: "10px",
    },
    todoActionIcon: {
        margin: "0 4px",
        cursor: "pointer",
        whiteSpace: "nowrap"
    },
    strikeThrough: {
        textDecoration: "line-through"
    },
    dateTime: {
        background: "#fff",
        borderRadius: "10px",
        padding: "3px",
        fontSize: "0.8rem",
        minWidth: "50px",
        boxShadow: "0 0 3px #ccc",
        textAlign: "center"
    }
})