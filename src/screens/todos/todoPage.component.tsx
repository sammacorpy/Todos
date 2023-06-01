import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Navbar } from "../../components/navbar.component";
import { StyleSheet, css } from "aphrodite";
import commonCss, {
  margin,
} from "../../commonCss";
import {
  isMobileView,
  priorityOneColor,
  softBlack,
} from "../../theme";
import { RiTodoLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { TodosContainer } from "../../components/todosContainer.component";
import { Todo } from "../../interface/todo";
import todosRepository from "../../repositories/todos.repository";
import { authContext } from "../../App";
import { Auth } from "../../interface/auth";
import { filterTodosByStatus, initialNewTodo } from "../../utils/todoUtils";
import { TodoInputBar } from "../../components/todoInputBar.component";

export const todoContext = createContext({} as any);


const TodoPage = () => {
  const inputRef = useRef<HTMLElement>();
  const { auth }: { auth: Auth } = useContext(authContext);
  const [todos, setTodos] = useState([] as Todo[]);
  const [todosByStatus, setTodosByStatus] = useState({} as any);
  const [newTodo, setNewTodo] = useState(initialNewTodo as Todo);

  useEffect(() => {
    todosRepository
      .getTodos(auth?.user?.id)
      .then((_todos) => setTodos(_todos || []));
  }, [auth]);
  useEffect(() => {
    setTodosByStatus(filterTodosByStatus(todos));
  }, [todos]);
  const addOrEditTodo = (todo: Todo) => {
    if(todo.id) {
      todosRepository
        .editTodo(todo.id, todo)
        .then(() => setTodos(todos.map(_todo => _todo.id === todo.id ? todo : _todo)))
        .then(() => (setNewTodo(initialNewTodo as Todo)));
    } else
      todosRepository
        .addTodo(auth, todo)
        .then(() => setTodos([...todos,  todo ]))
        .then(() => (setNewTodo(initialNewTodo as Todo)));
  };
  const moveTodoTo = (todoID: string, status: string) => {
    todosRepository
      .editTodo(todoID, { status })
      .then(() =>
        setTodos(
          todos.map((todo) =>
            todo?.id === todoID ? { ...todo, status } : todo
          )
        )
      );
  };
  const deleteTodo = (todoID: string) => {
    todosRepository
      .deleteTodo(todoID)
      .then(() => setTodos(todos.filter((todo) => todo?.id !== todoID)));
  };
  const editTodo = (todoID: string) => {
    // get todo item to be edited
    const todo = todos.filter(todo=>todo.id===todoID);
    // load the values to display selected Todo Item in Input Bar
    setNewTodo(todo[0]);
    // set the input box focused
    inputRef.current?.focus()
  };
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <todoContext.Provider value={{ moveTodoTo, deleteTodo, editTodo }}>
        <section className={css(styles.todoSection, commonCss.column)}>
          <header>
            <span className={css(styles.todoSectionHeader)}>
              <RiTodoLine /> You should focus on
            </span>
            <div className={css(styles.todoSectionSubHeader)}>
              <FaCircle /> {"Cleaning House"}
            </div>
          </header>
          <div className={css(styles.todoSectionBody)}>
            <TodoInputBar inputRef={inputRef} inputValue={newTodo} onSubmit={()=>{addOrEditTodo(newTodo)}} onChange={(val: any)=>setNewTodo(val)}></TodoInputBar>
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
    color: priorityOneColor,
    padding: "0px 10px",
  },
  todoSectionBody: {
    marginTop: "40px",
    width: "100%",
  }
});

export default TodoPage;
