import { db } from "../db"
import bcrypt from 'bcryptjs'
import { User } from "../interface/user";
const salt = "$2a$10$RulEdthi.CTOBpV1kkGqCO"
const Users = () => ({
    async signup(name: string, username: string, password: string) {
        const hashedPassword = bcrypt.hashSync(password, salt);
        return await db.users.add({id: Date.now().toString(), name, username, password: hashedPassword})
    },
    async isUsernameUnique(username: string) {
        return (await db.users.where("username").equals(username).count()) === 0;
    },
    async signIn(username: string, password: string) {
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.users.get({username: username, password: hashedPassword});
        localStorage.setItem("signedInUserID", user?.id || "");
        return user;
    },
    async getUser(userID: string): Promise<User | undefined> {
        const user = await db.users.get({id: userID});
        if (user)
            return {id: user?.id || "", name: user?.name, username: user?.username}
    }
})

export default Users()