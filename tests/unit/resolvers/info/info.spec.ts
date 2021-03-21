import InfoResolver from '../../../../src/graphql/resolvers/info/info';

jest.mock('../../../../src/config', () => ({
  env: 'test',
  port: '8082',
}));

describe('Login query unit tests', () => {
  it('should return the application config - env and port', async () => {
    const resolver = new InfoResolver();
    const response = resolver.info();
    expect(response).toEqual({
      env: 'test',
      port: '8082',
    });
  });
});
