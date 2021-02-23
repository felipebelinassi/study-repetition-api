import express from 'express';
import apolloServer from './graphql';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const start = async (port: number): Promise<void> => {
  (await apolloServer()).applyMiddleware({ app, path: '/graphql' });

  return new Promise<void>((resolve) => {
    app.listen(port, async () => {
      resolve();
    });
  });
};

