import type { FastifyServer } from "@/interfaces/server";
import { loggerConfig } from "./config/logger";

export const createServer = (fastify: any): FastifyServer => {
  const env = (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
  const config = {
    logger: loggerConfig[env] ?? true,
    genReqId: (req: any) => req.headers['x-request-id'] || Math.random().toString(36).substring(7),
  };
  const server = fastify(config);
  server.setErrorHandler((error:any, request:any, reply:any) => {
    server.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error', requestId: request.id });
  });

  return server;
};