import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { config } from './config';
import { errorHandler } from './middlewares';
import { apiRouter } from './routes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get('/', (_, res) => res.json({ ok: true }));
app.use(morgan('combined'));
app.use('/api', apiRouter());
app.use(errorHandler());

app.listen(
  config.api.port,
  () => console.log(`Api listening on port ${config.api.port}`)
);

