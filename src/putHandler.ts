import { IncomingMessage, ServerResponse } from 'http';
import usersDB from './usersDB';
import checkID from './functions';
import { User } from './types';

const putHandler = (req: IncomingMessage, res: ServerResponse, data: User) => {
  const check = checkID(req, res);
  if (check < 0) return;
  let status = 200;
  let message;
  if (check > 0) {
    if (data.age) usersDB.users[check].age = data.age;
    if (data.hobbies) usersDB.users[check].hobbies = data.hobbies;
    if (data.username) usersDB.users[check].username = data.username;
    message = usersDB.users[check];
  } else {
    status = 404;
    message = 'NO user ID provided';
  }
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
};

export default putHandler;
