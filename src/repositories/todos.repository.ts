import { Todos, db } from "../db"
import { Todo } from "../interface/todo";
import { Auth } from "../interface/auth";

interface TodoMap {
    [key:string]: Todo
}

const todos = ()=> ({
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
        const todoMap = {} as TodoMap;
        (await db.todos.where({userid: userID}).toArray()).forEach(todo=> {
            todoMap[todo.id || ""] =  this.parseTodo(todo);
        });
        return todoMap;
    },
    async addTodo(auth:Auth, todo: any): Promise<any| undefined> {
        if (auth.isAuthenticated)
        {
            const _todo:Todos = Object.assign({}, todo, {
                id: Date.now().toString(),
                userid: auth?.user.id
            });
            return await db.todos.add(_todo);
        }
    },
    async deleteTodo(ID: string): Promise<void> {
        await db.todos.delete(ID);
    },
    async editTodo(ID:string, updatedTodo: Partial<Todo>): Promise<number> {
        return db.todos.update(ID, updatedTodo)
    }

})
export default todos()