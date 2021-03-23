import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Subject {
  @Field()
  id!: string;

  @Field()
  title!: string;
}
