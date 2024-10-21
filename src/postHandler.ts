import { ServerResponse } from 'http';
import usersDB from './usersDB';
import { User } from './types';

const postHandler = (res: ServerResponse, data: User) => {
  const result = usersDB.adduser(data);
  if (result) {
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.response));
  }
};
export default postHandler;
