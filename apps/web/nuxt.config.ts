import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    typescript: { tsConfig: { extends: "@repo/tsconfig/base.json" } },
});
