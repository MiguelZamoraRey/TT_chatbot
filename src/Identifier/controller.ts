import { Request, Response } from 'express';

import { callAI, identifyCarByImageUrl } from '@/services/aiAdapter';

export const question = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const response = await callAI({ content: prompt });
  res.send(response);
};

export const identifyImageUrl = async (req: Request, res: Response) => {
  const { imgUrl } = req.body;
  const response = await identifyCarByImageUrl(imgUrl);
  res.send(response);
};
