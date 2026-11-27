import type { FastifyInstance } from "fastify";
import type { HealthResponse } from "@repo/types/health";

export default function (app: FastifyInstance) {
    app.get<{ Reply: HealthResponse }>("/health", () => ({ status: "ok" }));
}
