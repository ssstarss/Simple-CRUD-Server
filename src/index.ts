import { createServer, IncomingMessage, ServerResponse } from 'http';
import { requestHandler } from './requestHandler';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  let data: string = '';
  req.on('data', (chunk) => {
    data += chunk;
    req.on('end', () => {
      try {
        const user = JSON.parse(data);
        requestHandler(req, res, JSON.parse(data));
      } catch (err) {
        if (err instanceof Error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify('Request body invalid'));
        }
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
