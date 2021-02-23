import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class AppInfo {
  @Field()
  env!: string;

  @Field()
  port!: number;
}
