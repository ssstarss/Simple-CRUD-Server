import { IncomingMessage, ServerResponse } from 'http';
import usersDB from './usersDB';
import checkID from './functions';

const deleteHandler = (req: IncomingMessage, res: ServerResponse) => {
  const check = checkID(req, res);
  if (check < 0) return;
  let status = 200;
  let message;
  if (check > 0) {
    usersDB.users.splice(check, 1);
    message = 'User deleted successfully';
  } else {
    status = 404;
    message = 'NO user ID provided';
  }
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
};
export default deleteHandler;
