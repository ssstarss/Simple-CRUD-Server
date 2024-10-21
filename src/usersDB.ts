import { Resp, User } from './types';

class UsersDB {
  users: User[];

  constructor() {
    this.users = [];
  }

  adduser(user: User): Resp {
    if (
      typeof user.username === 'string' &&
      typeof user.age === 'number' &&
      Array.isArray(user.hobbies)
    ) {
      const id = crypto.randomUUID();
      const newUser = {
        id,
        username: user.username,
        age: user.age,
        hobbies: user.hobbies,
      };
      this.users.push(newUser);
      return { response: newUser, status: 200 };
    }
    return { status: 400, response: 'Request body does not contain required fields' };
  }
}
const usersDB = new UsersDB();
export default usersDB;
