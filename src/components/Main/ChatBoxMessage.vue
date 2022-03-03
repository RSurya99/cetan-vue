<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const userId = computed(() => authStore.user.id)
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div
    :class="[props.message.from === userId ? 'justify-end' : 'justify-start']"
    class="w-full flex"
  >
    <div class="relative cursor-default flex items-center">
      <span
        v-if="props.message.from != userId"
        class="mr-1 text-xs text-gray-500 dark:text-gray-100"
        >{{ props.message.created_at }}</span
      >
      <div class="max-w-[85%] inline-block px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow">
        <p class="text-gray-700 dark:text-white leading-tight">{{ props.message.message }}</p>
      </div>
      <span
        v-if="props.message.from === userId"
        class="ml-1 text-xs text-gray-500 dark:text-gray-100"
        >{{ props.message.created_at }}</span
      >
    </div>
  </div>
</template>
