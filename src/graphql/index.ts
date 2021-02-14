import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { BuildSchemaOptions, buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';

const apolloServer = async () => {
  const resolvers = path.join(__dirname, '../graphql/resolvers/**/*.{ts,js}');
  const apolloSchemaOptions: BuildSchemaOptions = {
    resolvers: [resolvers],
    validate: false,
  };
  const apolloSchema = await buildSchema(apolloSchemaOptions);

  return new ApolloServer({
    schema: apolloSchema,
    validationRules: [depthLimit(7)],
    playground: true,
  });

};

export default apolloServer;
