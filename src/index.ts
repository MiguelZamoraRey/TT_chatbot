import express, { Request, Response } from 'express';
import cors from 'cors';

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

import identifierRouter from '@/Identifier/routes';

const app = express();

// You can change the allowed origins
const allowedOrigins = [`http://localhost:${PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));
app.use(express.json());

const port = process.env.PORT;

identifierRouter(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
