import { Todos, db } from "../db"
import { Todo, TodoMap } from "../interface/todo";
import { Auth } from "../interface/auth";


const todos = ()=> ({
    todoMap: {} as TodoMap,
    parseTodo(value: Todos): Todo {
        return {
            id: value.id || "",
            description: value.description,
            status: value.status,
            priority: value.priority,
            datetime: value.datetime
        }
    },
    async getTodos(userID: string): Promise<TodoMap> {
        this.todoMap = {};
        (await db.todos.where({userid: userID}).toArray()).forEach(todo=> {
            this.todoMap[todo.id || ""] =  this.parseTodo(todo);
        });
        return Object.assign(this.todoMap);
    },
    async addTodo(auth:Auth, todo: any): Promise<any| undefined> {
        if (auth.isAuthenticated)
        {
            const _todo:Todos = Object.assign(todo, {
                id: Date.now().toString(),
                userid: auth?.user.id
            });
            return await db.todos.add(_todo).then(ID => {
                this.todoMap[ID.toString()]= _todo;
                return ID;
            });
        }
    },
    async deleteTodo(ID: string): Promise<void> {
        delete this.todoMap[ID];
        await db.todos.delete(ID);
    },
    async editTodo(ID:string, updatedTodo: Partial<Todo>): Promise<number> {
        this.todoMap[ID] = Object.assign(this.todoMap[ID], updatedTodo);
        return db.todos.update(ID, updatedTodo)
    }

})
export default todos()