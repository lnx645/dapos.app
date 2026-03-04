// src/routes/sales/index.ts
import { SalesController } from "@/controllers/sales.controller";
import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance, opts: any) {
  let controller = new SalesController()
  //sales
  fastify.get("/", controller.index);
}
