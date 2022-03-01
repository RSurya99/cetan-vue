<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  link: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <span class="text-sm text-gray-500 font-medium mt-6">
    <slot>
      {{ props.text }}
      <RouterLink :to="props.link.to" class="underline hover:text-gray-600 transition duration-300">
        {{ props.link.text }}
      </RouterLink>
    </slot>
  </span>
</template>
