<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <RouterLink
    :to="props.route"
    class="font-medium mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
    :class="route.path === props.route ? 'dark:text-white text-gray-900' : 'text-gray-500'"
    >{{ props.name }}
  </RouterLink>
</template>
