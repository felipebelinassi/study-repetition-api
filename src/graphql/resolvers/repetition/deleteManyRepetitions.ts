import { Container } from 'typedi';
import { ApolloError } from 'apollo-server-errors';
import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { AuthorizedContext } from '../../../context';
import { DeleteRepetitionResponse } from '../../types/Repetition';
import RepetitionRepository from '../../../repositories/repetitionRepository';

@Resolver()
export default class DeleteRepetitionResolver {
  @Authorized()
  @Mutation(() => DeleteRepetitionResponse, {
    description: 'Delete many repetitions based on a single one',
  })
  async deleteManyRepetitionsFromOne(
    @Ctx() ctx: AuthorizedContext,
    @Arg('id') repetitionId: string,
    @Arg('deleteAll', {
      nullable: true,
      description: 'Flag to delete by identifier',
    })
    deleteAll?: boolean,
  ) {
    const repetitionRepository = Container.get(RepetitionRepository);
    const repetitionData = await repetitionRepository.getByUserAndId(ctx.user.id, repetitionId);

    if (!repetitionData || repetitionData.userId !== ctx.user.id) {
      throw new ApolloError('NOT_ALLOWED');
    }

    const { identifier, repetition } = repetitionData;

    if (deleteAll) {
      const { count } = await repetitionRepository.deleteByIdentifier(identifier);
      return { count, success: true };
    }

    const { count } = await repetitionRepository.deleteNextRepetitionsByIdentifier(
      identifier,
      repetition,
    );
    return { count, success: true };
  }
}
