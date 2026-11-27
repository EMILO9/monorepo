import Fastify from "fastify";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import autoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import mongoose from "mongoose";
import * as z from "zod";
import { fromZodError } from "zod-validation-error";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";

const app = Fastify({
    logger: isDev
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

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(8080),
    CORS_ORIGINS: z
        .string()
        .default("")
        .transform((v) =>
            v
                .split(",")
                .map((o) => o.trim())
                .filter(Boolean),
        ),
    MONGO_HOST: z.url(),
    MONGO_USER: z.string().trim().min(1),
    MONGO_PASS: z.string().min(1),
    MONGO_DB: z.string().trim().min(1).optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    app.log.error({ validation: fromZodError(result.error).toString() }, "Failed to validate ENV");
    process.exit(1);
}

const env = result.data;

app.register(helmet);
app.register(sensible);
app.register(cors, { origin: env.CORS_ORIGINS });
app.register(autoLoad, { dir: join(__dirname, "routes") });

try {
    await mongoose.connect(env.MONGO_HOST, {
        auth: { username: env.MONGO_USER, password: env.MONGO_PASS },
        dbName: env.MONGO_DB,
    });
    app.log.info({ dbName: mongoose.connection.name }, "Connected to MongoDB");
    await app.listen({ port: env.PORT });
} catch (error) {
    app.log.error({ err: error }, "Failed to start API");
    await Promise.allSettled([app.close(), mongoose.disconnect()]);
    process.exit(1);
}
