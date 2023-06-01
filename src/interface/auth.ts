import { User } from "./user";

export interface Auth {
    isAuthenticated: boolean;
    user: User
}