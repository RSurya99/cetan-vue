<script setup lang="ts">
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const selectedRoom = computed(() => roomStore.selectedRoom)
</script>
<template>
  <section
    id="chat-box"
    class="relative w-full bg-gray-100 dark:bg-gray-700 p-4 overflow-auto"
    :class="roomStore.isSelectedRoomEmpty ? 'h-[80vh]' : 'h-[82vh]'"
  >
    <div v-if="roomStore.isSelectedRoomEmpty" class="space-y-2">
      <MainChatBoxMessage
        v-for="message in selectedRoom.messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <div v-else class="w-full h-full flex flex-col items-center justify-center">
      <h2 class="text-3xl text-center font-semibold text-gray-700 dark:text-white">
        Click chat in sidebar or start a new chat
      </h2>
    </div>
  </section>
</template>
