import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class User {
  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  createdAt!: Date;
}
