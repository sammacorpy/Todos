import { Todos, db } from "../db"
import { Todo } from "../interface/todo";
import { Auth } from "../interface/auth";


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
    async getTodos(userID: string): Promise<Todo[]> {
        return (await db.todos.where({userid: userID}).toArray()).map(todo=> this.parseTodo(todo));
    },
    async addTodo(auth:Auth, todo: any): Promise<any| undefined> {
        if (auth.isAuthenticated)
        {
            const _todo:Todos = {
                ...todo,
                id: Date.now().toString(),
                userid: auth?.user.id
            }
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