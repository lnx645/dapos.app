import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    db: any; 
    config: {
      PORT: number;
    };
    container: any; 
  }

  interface FastifyRequest {
    user: {
      id: string;
      name: string;
    };
  }
}
