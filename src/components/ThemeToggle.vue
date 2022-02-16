<script setup lang="ts">
import { ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const theme = ref(false)

watch(theme, () => {
  console.log(theme.value)
  if (theme.value) {
    document.body.classList.add('dark')
    localStorage.theme = 'light'
  } else {
    document.body.classList.remove('dark')
    localStorage.theme = 'dark'
  }
})
</script>
<template>
  <Switch
    v-model="theme"
    :class="theme ? 'bg-gray-600' : 'bg-gray-200'"
    class="relative inline-flex flex-shrink-0 h-[28px] w-[46px] border border-gray-500 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      :class="theme ? 'translate-x-5 bg-gray-800' : 'translate-x-0 bg-white'"
      class="pointer-events-none flex items-center justify-center h-[22px] w-[22px] my-auto rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200"
    >
      <IconHeroiconsOutlineMoon v-if="theme" class="text-sm text-gray-300" />
      <IconHeroiconsOutlineSun v-else class="text-sm text-gray-700"
    /></span>
  </Switch>
</template>
