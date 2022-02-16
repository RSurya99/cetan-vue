<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="w-full flex" v-bind="$attrs">
    <div class="inline-block px-4 py-2 bg-white rounded-full">
      <p class="text-gray-700">{{ props.message }}</p>
    </div>
  </div>
</template>
