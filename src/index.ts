import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as dotenv from 'dotenv';
import requestHandler from './requestHandler';

dotenv.config();

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  let data: string = '';

  req.on('data', (chunk) => {
    data += chunk;
    req.on('end', () => {
      try {
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

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:/${process.env.PORT}`);
});
