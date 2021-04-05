import express from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import config from './config';
import pinoLogger from './logger';
import apolloServer from './graphql';
import initPrisma from '../prisma';

const logger = pinoLogger(config.logger);
export const app = express();

app.locals.logger = logger;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

export const start = async (port: number): Promise<void> => {
  (await apolloServer()).applyMiddleware({ app, path: '/graphql' });

  const prisma = initPrisma();
  Container.set('prisma', prisma);

  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      logger.info(`Application listening at port ${port}`);
      resolve();
    });
  });
};
