import { Todo } from "../interface/todo";

export const getDateStringToDisplay = (datetime: string) => {
  const dateObj = new Date(datetime);
  const date = dateObj.getDate();
  const monthNameByIndex = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  } as any;
  const month = dateObj.getMonth().toString();
  return `${date} ${monthNameByIndex[month]}`;
};

export const nextStateMapByPrevState = {
  Todo: "In Progress",
  "In Progress": "Done",
} as any;


export const filterTodosByStatus = (todos: Todo[]): { [key: string]: Todo[] } => {
  const todosByStatus = {} as { [key: string]: Todo[] };
  todos.forEach((todo) => {
    todo.status in todosByStatus
      ? todosByStatus[todo.status].push(todo)
      : (todosByStatus[todo.status] = [todo]);
  });
  return todosByStatus;
};

export const initialNewTodo = { status: "Todo", priority: "High", description: "", datetime: "" } as Todo;