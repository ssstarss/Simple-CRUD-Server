import { IncomingMessage, ServerResponse } from 'http';
import usersDB from './usersDB';
import checkID from './functions';

const getHandler = (req: IncomingMessage, res: ServerResponse) => {
  const check = checkID(req, res);
  if (check < 0) return;
  let status;
  let message;

  if (check === 0) {
    status = 200;
    message = usersDB.users;
  } else {
    status = 200;
    message = usersDB.users[check];
  }

  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
};

export default getHandler;
