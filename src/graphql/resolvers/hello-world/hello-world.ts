import { Resolver, Query } from 'type-graphql';
import HelloWorld from '../../types/hello-world';

@Resolver()
class HelloWorldResolver {
  @Query(() => HelloWorld, { description: 'GraphQL Hello World' })
  helloWorld() {
    return {
      message: '👋 Hello world! 👋',
    };
  }
}

export default HelloWorldResolver;
