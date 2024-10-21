import { IncomingMessage, ServerResponse } from 'http';
import usersDB from './usersDB';
import { ERR_NO_USER, ERR_NOT_UUID } from './types';

function responseError(err: number, res: ServerResponse) {
  let message;
  if (err === ERR_NOT_UUID) message = 'User ID is not valid UUID';
  if (err === ERR_NO_USER) message = 'User ID does not exists';
  res.writeHead(err, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
}

const checkID = (req: IncomingMessage, res: ServerResponse): number => {
  const userID = req.url?.slice(11);
  let result;
  if (userID) {
    const isUUDD = userID.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    );
    if (!isUUDD) {
      responseError(ERR_NOT_UUID, res);
      return -1;
    }
    result = usersDB.users.findIndex((item) => item.id === userID);
    if (result < 0) {
      responseError(ERR_NO_USER, res);
      return -1;
    }
    return result;
  }
  return 0;
};

export default checkID;
