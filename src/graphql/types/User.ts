import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user!: User;

  @Field(() => String)
  token!: string;
}
