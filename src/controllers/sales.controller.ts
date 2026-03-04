import type { FastifyReply, FastifyRequest } from "fastify";

export class SalesController {
    async index(request : FastifyRequest, req : FastifyReply){
        return "OKE WORK";
    }
}
