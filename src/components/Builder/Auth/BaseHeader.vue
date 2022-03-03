<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <h1 class="text-4xl font-bold text-emerald-500">{{ props.title }}</h1>
  <p class="text-gray-500 font-medium leading-relaxed mt-2">
    {{ props.subtitle }}
  </p>
</template>
