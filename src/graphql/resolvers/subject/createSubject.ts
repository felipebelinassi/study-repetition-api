import { Container } from 'typedi';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { AuthorizedContext } from '../../../context';
import Subject from '../../types/Subject';
import SubjectRepository from '../../../repositories/subjectRepository';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export default class CreateSubjectResolver {
  @Authorized()
  @Mutation(() => Subject, { description: 'Create a new subject for repetitions' })
  async createSubject(@Arg('title') title: string, @Ctx() ctx: AuthorizedContext) {
    ctx.logger.info('Creating new subject');
    try {
      const subjectRepository = Container.get(SubjectRepository);
      return await subjectRepository.create(ctx.user.id, title);
    } catch (err) {
      ctx.logger.error('Error creating a new subject', err);
      // TODO: Create error handler for prisma errors
      if (err.code === 'P2002') {
        throw new ApolloError('SUBJECT_ALREADY_EXISTS');
      }
      throw new ApolloError('Error creating a new subject');
    }
  }
}
