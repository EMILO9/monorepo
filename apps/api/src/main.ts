import Fastify from "fastify";

const app = Fastify({
    logger:
        process.env.NODE_ENV !== "production"
            ? {
                  transport: {
                      target: "pino-pretty",
                      options: {
                          colorize: true,
                          translateTime: "HH:MM:ss",
                          ignore: "pid,hostname",
                      },
                  },
              }
            : true,
});

const port = Number(process.env.PORT) || 8080;

await app.listen({ port });
