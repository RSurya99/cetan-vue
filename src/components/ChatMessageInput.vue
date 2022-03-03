<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
</script>
<template>
  <div class="w-full">
    <input
      type="text"
      class="focus:outline-none focus:ring-0 block w-full px-4 py-2 bg-emerald-100 dark:bg-white dark:text-gray-700 focus:border focus:border-emerald-500 rounded-md transition duration-300"
      placeholder="Type a message"
      v-model="value"
    />
  </div>
</template>
