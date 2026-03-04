import fastifyAccepts from "@fastify/accepts";
import { registerRoutes } from "@/routes";
import diPlugin from "@/plugins/di";
import fastifyWebsocket from "@fastify/websocket";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import fastifyView from "@fastify/view";
import type { FastifyInstance } from "fastify";
export class Application {
  app: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.app = fastify;
  }
  public async stop() {
    await this.app.close();
  }
  public async initialize() {
    console.log("Initializing the application...");
    await this.initPlugin();
    console.log("Plugin initialized");
    await this.initRoutes();
    console.log("Routes initialized");
  }
  private async initRoutes() {
    this.app.register(registerRoutes, {
      prefix: "/api",
    });
  }
  private async initPlugin() {
    this.app.register(fastifyHelmet, { global: true });
    this.app.register(fastifyCors);
    this.app.register(diPlugin)
    this.app.register(fastifyAccepts);
    this.app.register(fastifyWebsocket);
    this.app.register(fastifyView, { engine: { ejs: require("ejs") } });
  }
  public async start() {
    try {
      await this.app.listen({ port: 3000, host: "0.0.0.0" });
      console.log("Server is running on port 3000");
    } catch (error) {
      console.error("Error starting the server:", error);
      process.exit(1);
    }
  }
}
