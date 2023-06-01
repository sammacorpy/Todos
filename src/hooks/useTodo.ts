import { useRef, useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { Auth } from "../interface/auth";
import { Todo } from "../interface/todo";
import todosRepository from "../repositories/todos.repository";
import {
  filterMostPrioritizedTodo,
  filterTodosByStatus,
} from "../utils/todoUtils";
import { DropResult } from "react-beautiful-dnd";

const reorderTodos = (
  todos: Todo[],
  sourceIndex: number,
  destinationIndex: number
): Todo[] => {
  const reorderTodos = Array.from(todos);
  const [removedTodo] = reorderTodos.splice(sourceIndex, 1);
  reorderTodos.splice(destinationIndex, 0, removedTodo);
  return reorderTodos;
};

export const useTodo = (initialTodo: Todo) => {
  const inputRef = useRef<HTMLElement>();
  const { auth }: { auth: Auth } = useContext(authContext);
  const [todos, setTodos] = useState([] as Todo[]);
  const [todosByStatus, setTodosByStatus] = useState({} as any);
  const [newTodo, setNewTodo] = useState(initialTodo as Todo);
  const [mostPrioritizedTodo, setMostPrioritizedTodo] = useState({} as Todo);

  useEffect(() => {
    console.log("for each user runs time");
    todosRepository
      .getTodos(auth?.user?.id)
      .then((_todos) => setTodos(_todos || []));
  }, [auth]);
  useEffect(() => {
    setTodosByStatus(filterTodosByStatus(todos));
    setMostPrioritizedTodo(filterMostPrioritizedTodo(todos));
  }, [todos]);
  const addOrEditTodo = (todo: Todo) => {
    if (todo.id) {
      todosRepository
        .editTodo(todo.id, todo)
        .then(() =>
          setTodos(todos.map((_todo) => (_todo.id === todo.id ? todo : _todo)))
        )
        .then(() => setNewTodo(initialTodo as Todo));
    } else
      todosRepository
        .addTodo(auth, todo)
        .then((id) => setTodos([...todos, { ...todo, id }]))
        .then(() => setNewTodo(initialTodo as Todo));
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
    const todo = todos.filter((todo) => todo.id === todoID);
    // load the values to display selected Todo Item in Input Bar
    setNewTodo(todo[0]);
    // set the input box focused
    inputRef.current?.focus();
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === destination.droppableId) {
      const sourceContainerTodos = todosByStatus[source.droppableId];
      const reorderedTodos = reorderTodos(
        sourceContainerTodos,
        source.index,
        destination.index
      );
      setTodos(reorderedTodos);
    }
  };

  return {
    todosByStatus,
    inputRef,
    newTodo,
    mostPrioritizedTodo,
    setNewTodo,
    handleOnDragEnd,
    addOrEditTodo,
    moveTodoTo,
    handleClickOnEditIcon,
    deleteTodo,
  };
};
