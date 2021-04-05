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
    const repetitionRepository = Container.get(RepetitionRepository);
    const repetition = await repetitionRepository.getByUserAndId(ctx.user.id, repetitionId);

    if (!repetition || repetition.userId !== ctx.user.id) {
      throw new ApolloError('NOT_ALLOWED');
    }

    await repetitionRepository.deleteById(repetitionId);
    return { success: true };
  }
}
