import { Field, InputType } from 'type-graphql';

@InputType('UserInputCreate')
export default class UserInputCreate {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
