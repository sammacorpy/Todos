import { StyleSheet, css } from "aphrodite";
import { margin, mobileView, padding} from "../commonCss";
import { Todo } from "../interface/todo";
import { TodoItem } from "./todoItem.component";
import { shadowColor } from "../theme";

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
      <section className={css(margin("10px 5px"))}>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo}></TodoItem> )}
        
      </section>
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
