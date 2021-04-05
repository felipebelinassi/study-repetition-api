import type { Logger } from 'pino';

const loggerMock = ({
  info: () => ({}),
  warn: () => ({}),
  debug: () => ({}),
  error: () => ({}),
} as unknown) as Logger;

loggerMock.child = () => loggerMock;

export default loggerMock;
