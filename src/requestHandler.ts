import { IncomingMessage, ServerResponse } from 'http';
import postHandler from './postHandler';
import { User } from './usersDB';
import getHandler from './getHandler';
import deleteHandler from './deleteHandler';
import putHandler from './putHandler';

const requestHandler = (req: IncomingMessage, res: ServerResponse, data: User) => {
  if (req.url?.startsWith('/api/users')) {
    switch (req.method) {
      case 'GET': {
        getHandler(req, res);
        break;
      }
      case 'POST': {
        postHandler(req, res, data);
        break;
      }
      case 'DELETE': {
        deleteHandler(req, res);
        break;
      }
      case 'PUT': {
        putHandler(req, res, data);
        break;
      }
      default: {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'Invalid endpoint given',
          })
        );
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Invalid endpoint given',
      })
    );
  }
};

export default requestHandler;
