<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <p>{{ a }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";

const a = ref(1337);
</script>
