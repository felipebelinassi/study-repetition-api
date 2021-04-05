import pinoLogger from '../../../src/logger';

describe('Logger unit tests', () => {
  describe('when creating logger', () => {
    it('should create a logger if logging is enabled', () => {
      const mockConfig = {
        enabled: true,
        level: 'info',
      };
      const logger = pinoLogger(mockConfig);
      expect(logger).toBeTruthy();
    });
  });
});
