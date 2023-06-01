import { StyleSheet, css } from "aphrodite";
import { margin, mobileView, padding} from "../commonCss";
import { Todo } from "../interface/todo";
import { TodoItem } from "./todoItem.component";
import { shadowColor } from "../theme";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface TodosContainerProps {
  columnName: string;
  todos: Todo[]
}

export const TodosContainer = ({ columnName, todos }: TodosContainerProps) => {
  return (
    <div className={css(styles.todosContainer)}>
      <header className={css(styles.todoContainerHeader)}>
        <h4 className={css(margin("0"), padding("15px"))}>{columnName}</h4>
      </header>
      <Droppable droppableId={columnName}>
        {(droppableProvided, droppableSnapshot)=>
          <section className={css(margin("10px 5px"))} ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {todos.map((todo, index) => <Draggable key={todo.id} draggableId={todo.id || ""} index={index}>
                {(draggableProvided, draggableSnapshot) => <TodoItem innerRef={draggableProvided.innerRef}  key={todo.id} todo={todo} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}></TodoItem>}
            </Draggable>
            )}
          </section>
        }
      </Droppable>

    </div>
  );
};

const styles = StyleSheet.create({
  todosContainer: {
    background: "#fff",
    minHeight: "70vh",
    flex:"1",
    borderRadius: "10px",
    margin: "10px 10px",
    [mobileView]: {
        width: "100%"
    }
    
  },
  todoContainerHeader: {
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: `0 0px 1px ${shadowColor}`
  }
});
