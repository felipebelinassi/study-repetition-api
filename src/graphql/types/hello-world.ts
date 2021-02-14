import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class HelloWorldResponse {
  @Field()
  message!: string;
}

export default HelloWorldResponse;
