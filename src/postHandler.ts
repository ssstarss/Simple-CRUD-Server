import { IncomingMessage, ServerResponse } from 'http';
import { User, usersDB } from './usersDB';

const postHandler = (req: IncomingMessage, res: ServerResponse, data: User) => {
  const result = usersDB.adduser(data);
  if (result) {
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    if (result.status === 400) res.end(JSON.stringify(result.message));
    if (result.status === 200) res.end(JSON.stringify(result.newUser));
  }
};
export default postHandler;
