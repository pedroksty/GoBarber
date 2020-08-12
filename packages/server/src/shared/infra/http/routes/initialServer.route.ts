import { Router } from 'express';
import { port } from '../app';

const initialServer = Router();

initialServer.get('/', (request, response) => {
  return response.json({ message: `Server running in port ${port}` });
});

export default initialServer;
