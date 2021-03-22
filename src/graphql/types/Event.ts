import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Subject {
  @Field()
  id!: string;

  @Field()
  title!: string;
}

@ObjectType()
class Repetition {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  identifier!: string;

  @Field()
  subject!: Subject;

  @Field()
  repetition!: number;

  @Field()
  date!: Date;

  @Field()
  createdAt!: Date;
}

@ObjectType()
export class CreateEventsResponse {
  @Field()
  count!: number;

  @Field(() => [Repetition])
  repetitions!: Repetition[];
}
