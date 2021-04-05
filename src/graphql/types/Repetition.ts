import { Field, ObjectType } from 'type-graphql';
import Subject from './Subject';

@ObjectType()
export class Repetition {
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
export class CreateRepetitionsResponse {
  @Field()
  count!: number;

  @Field(() => [Repetition])
  repetitions!: Repetition[];
}

@ObjectType()
export class DeleteRepetitionResponse {
  @Field()
  success!: boolean;
}
