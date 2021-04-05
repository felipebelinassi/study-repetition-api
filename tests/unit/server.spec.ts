import * as server from '../../src/app';

jest.mock('../../src/logger', () => () => ({
  info: jest.fn(),
  child: jest.fn(),
}));
jest.mock('../../src/graphql', () =>
  jest.fn(() => ({
    applyMiddleware: () => jest.fn(),
  })),
);
jest.mock('cors', () => jest.fn());
jest.mock('express', () => {
  const reqMock = {
    app: {
      locals: {},
    },
  };
  const resMock = {
    send: jest.fn(),
    locals: {},
  };

  const expressMock = () => ({
    use: jest.fn((middleware) => middleware),
    listen: jest.fn((port, listener) => listener()),
    get: jest.fn((path, handler) => handler(reqMock, resMock)),
    set: jest.fn(),
    locals: {},
  });

  expressMock.json = jest.fn(() => jest.fn(() => jest.fn()));
  expressMock.urlencoded = jest.fn(() => jest.fn(() => jest.fn()));

  return expressMock;
});

describe('Server application smoke test', () => {
  it('should start server', async () => {
    const port = 8081;
    expect(await server.start(port)).toBeUndefined();
  });
});
