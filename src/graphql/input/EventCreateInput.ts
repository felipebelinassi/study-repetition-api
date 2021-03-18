import { Field, InputType } from 'type-graphql';

@InputType()
class SubjectInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  title!: string;
}

@InputType('EventCreateInput')
export default class EventCreateInput {
  @Field(() => String)
  title!: string;

  @Field(() => SubjectInput)
  subject!: SubjectInput;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => [Number])
  frequency!: number[];
}
