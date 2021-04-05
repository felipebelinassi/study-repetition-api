import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { Container } from 'typedi';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';
import Context from '../context';
import authChecker from '../helpers/authChecker';

const apolloServer = async () => {
  const context = Container.get(Context);
  const resolvers = path.join(__dirname, '../graphql/resolvers/**/*.{ts,js}');
  const apolloSchemaOptions: BuildSchemaOptions = {
    authChecker,
    resolvers: [resolvers],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemaOptions);

  return new ApolloServer({
    schema: apolloSchema,
    validationRules: [depthLimit(7)],
    context: context.createContext(),
    playground: true,
    introspection: true,
  });
};

export default apolloServer;
