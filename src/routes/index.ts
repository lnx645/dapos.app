import type { FastifyInstance } from "fastify";
import sales from "./sales";
import authRoutes from "./auth.routes";

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(sales, { prefix: "/sales" });
  fastify.register(authRoutes, { prefix: "/auth" });
}
