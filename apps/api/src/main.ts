import Fastify from "fastify";

const app = Fastify({ logger: true });

const port = Number(process.env.PORT) || 8080;

await app.listen({ port });
