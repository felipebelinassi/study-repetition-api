import { Field, InputType } from 'type-graphql';

@InputType('RepetitionCreateInput')
export default class RepetitionCreateInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  subjectId!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => [Number])
  frequency!: number[];
}
