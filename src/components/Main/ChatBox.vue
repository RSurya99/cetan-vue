<script setup lang="ts">
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
</script>
<template>
  <section
    id="chat-box"
    class="relative w-full bg-gray-100 dark:bg-gray-700 p-4 space-y-2 overflow-auto"
    :class="roomStore.isSelectedRoomEmpty ? 'h-[80vh]' : 'h-[82vh]'"
  >
    <div v-if="roomStore.isSelectedRoomEmpty">
      <div
        v-for="i in 18"
        :key="i"
        :class="[i % 2 === 0 ? 'justify-start' : 'justify-end']"
        class="w-full flex"
      >
        <div class="relative group cursor-default">
          <div
            :class="[i % 2 === 0 ? 'left-28' : 'right-28']"
            class="absolute top-[0.4rem] w-full hidden group-hover:block bg-gray-500 py-1 text-center text-white text-xs backdrop-blur rounded-md shadow"
          >
            2 weeks ago
          </div>
          <div class="inline-block px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow">
            <p class="text-gray-700 dark:text-white leading-tight">Halo guys</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex flex-col items-center justify-center">
      <h2 class="text-3xl text-center font-semibold text-gray-700 dark:text-white">
        Click chat in sidebar or start a new chat
      </h2>
    </div>
  </section>
</template>
