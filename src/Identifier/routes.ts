import { Router } from 'express';
import { question, identifyImageUrl } from '@/Identifier/controller';
import { Express } from 'express-serve-static-core';

const router = Router();

const exampleRouter = (app: Express) => {
  router.post('/question', question);
  router.post('/identifyCar', identifyImageUrl);
  app.use('/ai', router);
};

export default exampleRouter;
