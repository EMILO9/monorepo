import type { FastifyInstance } from "fastify";

export default function (app: FastifyInstance) {
    app.get("/health", () => ({ status: "ok" }));
}
