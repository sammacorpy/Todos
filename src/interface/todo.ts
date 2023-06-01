export interface Todo {
    id?: string;
    description: string;
    priority: string;
    datetime: string;
    status: string;
}

export interface TodoMap {
    [key:string]: Todo
}
