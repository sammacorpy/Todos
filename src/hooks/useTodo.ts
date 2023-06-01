import { useRef, useContext, useState, useEffect } from "react";
import { authContext } from "../App";
import { Auth } from "../interface/auth";
import { Todo } from "../interface/todo";
import todosRepository from "../repositories/todos.repository";
import {
  filterMostPrioritizedTodoIDs,
  getTodoIDsByStatusMap,
} from "../utils/todoUtils";
import { DropResult } from "react-beautiful-dnd";

const reorderTodoIDs = (
  todoIDs: string[],
  sourceIndex: number,
  destinationIndex: number
): string[] => {
  const reorderedTodoIDs = Array.from(todoIDs || []);
  const [removedTodoID] = reorderedTodoIDs.splice(sourceIndex, 1);
  reorderedTodoIDs.splice(destinationIndex, 0, removedTodoID);
  return reorderedTodoIDs;
};

export const useTodo = (initialTodo: Todo) => {
  const inputRef = useRef<HTMLElement>();
  const { auth }: { auth: Auth } = useContext(authContext);
  const [todoIDsByStatusMap, setTodoIDsByStatusMap] = useState({} as any);
  const [newTodo, setNewTodo] = useState(initialTodo as Todo);
  const [mostPrioritizedTodoID, setMostPrioritizedTodoID] = useState(
    "" as Todo["id"]
  );

  useEffect(() => {
    todosRepository.getTodos(auth?.user?.id).then((_todoMap) => {
      setTodoIDsByStatusMap(getTodoIDsByStatusMap(_todoMap));
      setMostPrioritizedTodoID(filterMostPrioritizedTodoIDs(_todoMap));
    });
  }, [auth]);

  useEffect(() => {
    setMostPrioritizedTodoID(
      filterMostPrioritizedTodoIDs(todosRepository.todoMap)
    );
  }, [todoIDsByStatusMap]);

  const addOrEditTodo = (todo: Todo) => {
    if (todo.id) {
      todosRepository
        .editTodo(todo.id, todo)
        .then(() => setNewTodo(initialTodo as Todo));
    } else
      todosRepository
        .addTodo(auth, todo)
        .then((id) => {
          const newTodoIDs = Array.from(todoIDsByStatusMap[todo.status] || []);
          newTodoIDs.push(id);
          setTodoIDsByStatusMap(
            Object.assign({}, todoIDsByStatusMap, { [todo.status]: newTodoIDs })
          );
        })
        .then(() => setNewTodo(initialTodo as Todo));
  };

  const moveTodoTo = (todoID: string, status: string) => {
    todosRepository
      .editTodo(todoID, { status })
      .then(() =>
        setTodoIDsByStatusMap(getTodoIDsByStatusMap(todosRepository.todoMap))
      );
  };

  const deleteTodo = (todoID: string) => {
    const todoDeleted = todosRepository.todoMap[todoID];
    todosRepository.deleteTodo(todoID).then(() => {
      setTodoIDsByStatusMap(
        Object.assign({}, todoIDsByStatusMap, {
          [todoDeleted.status]: todoIDsByStatusMap[todoDeleted.status].filter(
            (deleteTodoID: string) => deleteTodoID !== todoID
          ),
        })
      );
    });
  };

  const handleClickOnEditIcon = (todoID: string) => {
    // get todo item to be edited
    const todo = todosRepository.todoMap[todoID];
    // load the values to display selected Todo Item in Input Bar
    setNewTodo(todo);
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
      const sourceContainerTodoIDs =
        todoIDsByStatusMap[source.droppableId];
      const reorderedTodoIDs = reorderTodoIDs(
        sourceContainerTodoIDs,
        source.index,
        destination.index
      );
      const reorderedTodoIDsByStatus = {
        [source.droppableId]: reorderedTodoIDs,
      };
      setTodoIDsByStatusMap(
        Object.assign({}, todoIDsByStatusMap, reorderedTodoIDsByStatus)
      );
      return;
    }

    const sourceTodoIDs = Array.from(todoIDsByStatusMap[source.droppableId] || []);
    const [removed] = sourceTodoIDs.splice(source.index, 1);
    moveTodoTo(removed as string, destination.droppableId);
  };

  return {
    todoMap: todosRepository.todoMap,
    todoIDsByStatusMap,
    inputRef,
    newTodo,
    mostPrioritizedTodoID,
    setNewTodo,
    handleOnDragEnd,
    addOrEditTodo,
    moveTodoTo,
    handleClickOnEditIcon,
    deleteTodo,
  };
};
