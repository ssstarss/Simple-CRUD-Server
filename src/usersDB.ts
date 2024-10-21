export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

class UsersDB {
  users: User[];
  constructor() {
    this.users = [];
  }
  adduser(user: User) {
    console.log('User:', user, typeof user.age);
    if (
      typeof user.username === 'string' &&
      typeof user.age === 'number' &&
      Array.isArray(user.hobbies)
    ) {
      console.log('11111');
      const id = crypto.randomUUID();
      console.log(id);
      const newUser = {
        id: id,
        username: user.username,
        age: user.age,
        hobbies: user.hobbies,
      };
      this.users.push(newUser);
      return { newUser, status: 200 };
    } else console.log('222');
    return { newUser: {}, status: 400, message: 'Request body does not contain required fields' };
  }
}
export const usersDB = new UsersDB();
