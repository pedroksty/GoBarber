import 'reflect-metadata';

import express from 'express';
import router from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

export const port = 4444;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

export default app;
