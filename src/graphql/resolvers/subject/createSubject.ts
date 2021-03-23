import { Container } from 'typedi';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { AuthorizedContext } from '../../../context';
import Subject from '../../types/Subject';
import SubjectRepository from '../../../repositories/subjectRepository';

@Resolver()
export default class CreateEventResolver {
  @Authorized()
  @Mutation(() => Subject, { description: 'Create a new subject for events' })
  async createSubject(@Arg('title') title: string, @Ctx() ctx: AuthorizedContext) {
    const subjectRepository = Container.get(SubjectRepository);
    return subjectRepository.createSubject(ctx.user.id, title);
  }
}
