import { IncomingMessage, ServerResponse } from 'http';
import { postHandler } from './postHandler';
import { User } from './usersDB';
import { getHandler } from './getHandler';
import { deleteHandler } from './deleteHandler';

export const requestHandler = (req: IncomingMessage, res: ServerResponse, data: User) => {
  let user;
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
