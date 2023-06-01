import { Todo, TodoMap } from "../interface/todo";

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
  Todo: "In-Progress",
  "In-Progress": "Done",
} as any;


export const getTodoIDsByStatusMap = (todoMap: TodoMap): { [key: string]: Todo['id'][] } => {
  const todoIDsByStatus = {} as { [key: string]: Todo['id'][] };
  Object.keys(todoMap).forEach((todoID) => {
    const todo = todoMap[todoID];
    todo.status in todoIDsByStatus
      ? todoIDsByStatus[todo.status].push(todo.id)
      : (todoIDsByStatus[todo.status] = [todo.id]);
  });
  return todoIDsByStatus;
};

export const filterMostPrioritizedTodoIDs = (todoMap: TodoMap): Todo['id'] => {
  const highestPriorityTodos = Object.keys(todoMap).filter(todoID => todoMap[todoID].priority === "High" && todoMap[todoID].status==="Todo");
  const mediumPriorityTodos = Object.keys(todoMap).filter(todoID => todoMap[todoID].priority === "Medium" && todoMap[todoID].status==="Todo");
  const lowPriorityTodos = Object.keys(todoMap).filter(todoID => todoMap[todoID].priority === "Low" && todoMap[todoID].status==="Todo");
  const filterTodo = highestPriorityTodos.concat(mediumPriorityTodos).concat(lowPriorityTodos);
  return filterTodo[0]
}

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

export const initialTodo = { status: "Todo", priority: "High", description: "", datetime: getTodayDate() } as Todo;