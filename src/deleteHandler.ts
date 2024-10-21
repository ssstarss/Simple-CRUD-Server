import { IncomingMessage, ServerResponse } from 'http';
import { usersDB } from './usersDB';

export const deleteHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userID = req.url?.slice(11);
  console.log('ID', userID);
  if (userID) {
    try {
      console.log('UserID', userID, userID.length);
      let result;
      if (userID.length > 0) {
        const isIdUUID = userID.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        );
        if (!isIdUUID) throw new Error('400');
        const index = usersDB.users.findIndex((item) => item.id === userID);
        if (!index) throw new Error('404');
        usersDB.users.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify('User deleted successfully'));
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
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usersDB));
  }
};
