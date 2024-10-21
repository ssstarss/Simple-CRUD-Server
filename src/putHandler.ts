import { IncomingMessage, ServerResponse } from 'http';
import { User, usersDB } from './usersDB';

const putHandler = (req: IncomingMessage, res: ServerResponse, data: User) => {
  const userID = req.url?.slice(11);
  if (userID) {
    try {
      if (userID.length > 0) {
        const isIdUUID = userID.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        );
        if (!isIdUUID) throw new Error('400');
        const index = usersDB.users.findIndex((item) => item.id === userID);

        if (index < 0) throw new Error('404');
        if (data.age) usersDB.users[index].age = data.age;
        if (data.hobbies) usersDB.users[index].hobbies = data.hobbies;
        if (data.username) usersDB.users[index].username = data.username;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(usersDB.users[index]));
      }
    } catch (err) {
      let status = 200;
      let message;
      if (err instanceof Error) {
        if (err.message === '400') {
          status = 400;
          message = 'User ID is not valid UUID';
        }
        if (err.message === '404') {
          status = 404;
          message = 'User ID does not exists';
        }
      }

      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(message));
    }
  }
};

export default putHandler;
