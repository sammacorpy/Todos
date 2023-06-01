import React, {
  createContext,
} from "react";
import { Navbar } from "../../components/navbar.component";
import { StyleSheet, css } from "aphrodite";
import commonCss, { color, margin } from "../../commonCss";
import { colorByPriority, isMobileView, softBlack } from "../../theme";
import { RiTodoLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { TodosContainer } from "../../components/todosContainer.component";
import { initialTodo } from "../../utils/todoUtils";
import { TodoInputBar } from "../../components/todoInputBar.component";
import { useTodo } from "../../hooks/useTodo";

export const todoContext = createContext({} as any);

const TodoPage = () => {
  const {
    todosByStatus,
    inputRef,
    newTodo,
    mostPrioritizedTodo,
    setNewTodo,
    addOrEditTodo,
    moveTodoTo,
    handleClickOnEditIcon,
    deleteTodo,
  } = useTodo(initialTodo);
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <todoContext.Provider
        value={{ moveTodoTo, deleteTodo, handleClickOnEditIcon }}
      >
        <section className={css(styles.todoSection, commonCss.column)}>
          <header>
            <span className={css(styles.todoSectionHeader)}>
              <RiTodoLine /> You should focus on
            </span>
            <div className={css(styles.todoSectionSubHeader, color(colorByPriority[mostPrioritizedTodo?.priority]))}>
              <FaCircle /> {mostPrioritizedTodo?.description}
            </div>
          </header>
          <div className={css(styles.todoSectionBody)}>
            <TodoInputBar
              inputRef={inputRef}
              inputValue={newTodo}
              onSubmit={() => {
                addOrEditTodo(newTodo);
              }}
              onChange={(val: any) => setNewTodo(val)}
            ></TodoInputBar>
            <div
              className={css(
                isMobileView ? commonCss.column : commonCss.row,
                commonCss.justifySpaceAround,
                margin("40px 0px")
              )}
            >
              <TodosContainer
                columnName="Todo"
                todos={todosByStatus["Todo"] || []}
              />
              <TodosContainer
                columnName="In progress"
                todos={todosByStatus["In Progress"] || []}
              />
              <TodosContainer
                columnName="Done"
                todos={todosByStatus["Done"] || []}
              />
            </div>
          </div>
        </section>
      </todoContext.Provider>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  todoSection: {
    background: "#f3f3f3",
    height: "calc(100vh - 60px)",
    width: "100vw",
    boxSizing: "border-box",
    padding: "0 5%",
    overflowY: "auto",
  },
  todoSectionHeader: {
    color: softBlack,
    fontSize: "1.4rem",
    fontWeight: "bold",
    marginTop: "40px",
    display: "block",
  },
  todoSectionSubHeader: {
    padding: "0px 10px",
  },
  todoSectionBody: {
    marginTop: "40px",
    width: "100%",
  },
});

export default TodoPage;
