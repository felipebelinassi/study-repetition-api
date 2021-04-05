import { Container } from 'typedi';
import { ApolloError } from 'apollo-server-errors';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { AuthorizedContext } from '../../../context';
import { DeleteRepetitionResponse } from '../../types/Repetition';
import RepetitionRepository from '../../../repositories/repetitionRepository';

@Resolver()
export default class DeleteRepetitionResolver {
  @Authorized()
  @Mutation(() => DeleteRepetitionResponse, { description: 'Delete one single repetition' })
  async deleteOneRepetition(@Ctx() ctx: AuthorizedContext, @Arg('id') repetitionId: string) {
    ctx.logger.info('Deleting one single repetition');

    const repetitionRepository = Container.get(RepetitionRepository);
    const repetitionData = await repetitionRepository.getByUserAndId(ctx.user.id, repetitionId);

    if (!repetitionData || repetitionData.userId !== ctx.user.id) {
      ctx.logger.error('User is not allowed to delete this repetition');
      throw new ApolloError('NOT_ALLOWED');
    }

    await repetitionRepository.deleteById(repetitionId);
    return { success: true };
  }
}
