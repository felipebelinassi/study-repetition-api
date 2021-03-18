import { Field, InputType } from 'type-graphql';

@InputType('UserCreateInput')
export default class UserCreateInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
