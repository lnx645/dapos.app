// src/config/logger.ts
export const loggerConfig = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true, // Di prod, gunakan JSON standar untuk performa & log management (ELK/Grafana)
  test: false,
};