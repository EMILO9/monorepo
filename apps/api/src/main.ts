import Fastify from "fastify";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import autoLoad from "@fastify/autoload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.register(autoLoad, { dir: join(__dirname, "routes") });

const port = Number(process.env.PORT) || 8080;

await app.listen({ port });
