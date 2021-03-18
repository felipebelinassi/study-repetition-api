import express from 'express';
import { Container } from 'typedi';
import apolloServer from './graphql';
import initPrisma from '../prisma';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const start = async (port: number): Promise<void> => {
  (await apolloServer()).applyMiddleware({ app, path: '/graphql' });

  const prisma = initPrisma();
  Container.set('prisma', prisma);

  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      resolve();
    });
  });
};
