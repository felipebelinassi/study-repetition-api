import Joi from 'joi';

const loadConfig = (schema: Joi.ObjectSchema, envs: NodeJS.ProcessEnv) => {
  const { error, value: envVars } = schema.validate(envs, {
    abortEarly: true,
  });

  if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database: {
      url: envVars.DATABASE_URL,
    },
    logger: {
      enabled: envVars.LOGGER_ENABLED,
      level: envVars.LOGGER_LEVEL,
    },
    auth: {
      secret: envVars.JWT_SECRET_KEY,
      expiresIn: envVars.TOKEN_EXPIRES_IN,
    },
  };
};

export default loadConfig;
