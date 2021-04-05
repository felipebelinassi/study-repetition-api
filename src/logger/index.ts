import pino from 'pino';

interface LoggerConfig {
  enabled: boolean;
  level: string;
}

export default (config: LoggerConfig) =>
  pino({
    enabled: config.enabled,
    level: config.level,
  });
