<script setup lang="ts">
const props = defineProps({
  opponent: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <section class="px-4 py-2 w-full h-[10%] flex items-center justify-between border-b border-gray-200 shadow-sm">
    <div class="flex items-center space-x-4">
      <img src="https://randomuser.me/api/portraits/men/59.jpg" class="w-10 h-10 rounded-full" alt="" />
      <span class="text-lg font-semibold text-gray-700">{{ props.opponent.name }}</span>
    </div>
    <span class="space-x-4">
      <button class="p-2">
        <IconHeroiconsOutlineSearch class="text-gray-500" />
      </button>
      <button class="p-2">
        <IconHeroiconsOutlineDotsVertical class="text-gray-500" />
      </button>
    </span>
  </section>
</template>
