import { Resolver, Query } from 'type-graphql';
import AppInfo from '../../types/Info';
import config from '../../../config';

const { env, port } = config;

@Resolver()
class InfoResolver {
  @Query(() => AppInfo, { description: 'API info' })
  info() {
    return {
      env,
      port,
    };
  }
}

export default InfoResolver;
