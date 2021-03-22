import { Field, InputType } from 'type-graphql';
@InputType('EventCreateInput')
export default class EventCreateInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  subjectId!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => [Number])
  frequency!: number[];
}
