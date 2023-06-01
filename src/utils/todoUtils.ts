import { Todo } from "../interface/todo";

export const getDateStringToDisplay = (datetime: string) => {
  const dateObj = new Date(datetime);
  const date = dateObj.getDate();
  const monthNameByIndex = {
    "0": "Jan",
    "1": "Feb",
    "2": "Mar",
    "3": "Apr",
    "4": "May",
    "5": "Jun",
    "6": "Jul",
    "7": "Aug",
    "8": "Sep",
    "9": "Oct",
    "10": "Nov",
    "11": "Dec",
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

const getTodayDate = () => {
  const dateObj = new Date()
  let date = dateObj.getDate().toString();
  let month = dateObj.getMonth().toString();
  if (parseInt(month)<10)
    month = "0"+month;
  if (parseInt(date)<10)
    date = "0"+date;
  const year = dateObj.getFullYear();
  return `${year}-${month}-${date}`
}

export const initialNewTodo = { status: "Todo", priority: "High", description: "", datetime: getTodayDate() } as Todo;