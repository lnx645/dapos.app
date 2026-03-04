// main.ts
import fastify from "fastify";
import { Application } from "./application";
import { createServer } from "./server";

const start = async () => {
    // 1. Inisialisasi server dengan logger bawaan (Pino)
    // Sangat penting untuk audit trail di aplikasi POS
    const server = createServer(fastify);

    const app = new Application(server);
    try {
        await app.initialize();
        await app.start();

        const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
        for (const signal of signals) {
            process.on(signal, async () => {
                server.log.info(`Received ${signal}, shutting down...`);
                await app.stop()
                process.exit(0);
            });
        }

    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

start();