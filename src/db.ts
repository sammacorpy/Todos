import Dexie, { Table } from 'dexie';

export interface Users {
  id?: string;
  name: string;
  username: string;
  password: string;
}
export interface Todos {
  id?: string;
  description: string;
  priority: string;
  status: string;
  datetime: string;
  userid: string;
}

export class Database extends Dexie {
  users!: Table<Users>;
  todos!: Table<Todos>;


  constructor() {
    super('todolistDB');
    this.version(2).stores({
      users: 'id, name, username, password',
      todos: 'id, description, priority, status, datetime, userid'
    });
  }
}

export const db = new Database();