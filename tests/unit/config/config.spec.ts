import joi from 'joi';
import getConfig from '../../../src/config/config';

const schemaMock = joi
  .object({
    NODE_ENV: joi
      .string()
      .lowercase()
      .valid('local', 'test', 'development', 'production')
      .required(),
    PORT: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown()
  .required();

describe('Config unit tests', () => {
  describe('Success scenarios', () => {
    it('should return a valid config object', () => {
      const mockEnvironments = {
        NODE_ENV: 'development',
        PORT: '8082',
        DATABASE_URL: 'localhost:5432',
      };

      const config = getConfig(schemaMock, mockEnvironments);
      expect(typeof config).toBe('object');
      expect(config).toHaveProperty('env', mockEnvironments.NODE_ENV);
      expect(config).toHaveProperty('port', mockEnvironments.PORT);
      expect(config).toHaveProperty('database.url', mockEnvironments.DATABASE_URL);
    });
  });

  describe('Error scenarios', () => {
    it('should throw error when required values are missing', () => {
      const mockEnvironments = {
        NODE_ENV: 'development',
      };

      expect(() => getConfig(schemaMock, mockEnvironments)).toThrow(
        'Environment variables validation error: "PORT" is required',
      );
    });

    it('should throw error when values are invalid', () => {
      const mockEnvironments = {
        NODE_ENV: 'homologation',
        PORT: '8082',
      };

      expect(() => getConfig(schemaMock, mockEnvironments)).toThrow(
        'Environment variables validation error: "NODE_ENV" must be one of [local, test, development, production]',
      );
    });
  });
});
