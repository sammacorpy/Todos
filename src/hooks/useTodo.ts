import { useRef, useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { Auth } from "../interface/auth";
import { Todo } from "../interface/todo";
import todosRepository from "../repositories/todos.repository";
import { filterMostPrioritizedTodo, filterTodosByStatus } from "../utils/todoUtils";


export const useTodo = (initialTodo: Todo) => {
  const inputRef = useRef<HTMLElement>();
  const { auth }: { auth: Auth } = useContext(authContext);
  const [todos, setTodos] = useState([] as Todo[]);
  const [todosByStatus, setTodosByStatus] = useState({} as any);
  const [newTodo, setNewTodo] = useState(initialTodo as Todo);
  const [mostPrioritizedTodo, setMostPrioritizedTodo] = useState({} as Todo);


  useEffect(() => {
    todosRepository
      .getTodos(auth?.user?.id)
      .then((_todos) => setTodos(_todos || []));
  }, [auth]);
  useEffect(() => {
    setTodosByStatus(filterTodosByStatus(todos));
    setMostPrioritizedTodo(filterMostPrioritizedTodo(todos))
  }, [todos]);
  const addOrEditTodo = (todo: Todo) => {
    if(todo.id) {
      todosRepository
        .editTodo(todo.id, todo)
        .then(() => setTodos(todos.map(_todo => _todo.id === todo.id ? todo : _todo)))
        .then(() => (setNewTodo(initialTodo as Todo)));
    } else
      todosRepository
        .addTodo(auth, todo)
        .then(() => setTodos([...todos,  todo ]))
        .then(() => (setNewTodo(initialTodo as Todo)));
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
  const handleClickOnEditIcon = (todoID: string) => {
    // get todo item to be edited
    const todo = todos.filter(todo=>todo.id===todoID);
    // load the values to display selected Todo Item in Input Bar
    setNewTodo(todo[0]);
    // set the input box focused
    inputRef.current?.focus()
  };
  return {todosByStatus, inputRef, newTodo, mostPrioritizedTodo, setNewTodo ,addOrEditTodo, moveTodoTo, handleClickOnEditIcon, deleteTodo}
}