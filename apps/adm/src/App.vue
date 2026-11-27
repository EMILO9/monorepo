<template>
    <p>Health Check: {{ health }}</p>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import type { HealthResponse } from "@repo/types/health";
    const health = ref("waiting");
    onMounted(async () => {
        const response = await fetch("http://localhost:8080/health");
        const data: HealthResponse = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 4000));
        health.value = data.status;
    });
</script>
