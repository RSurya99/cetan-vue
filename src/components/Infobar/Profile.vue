<script lang="ts">
export default {
  name: 'InfobarProfile',
}
</script>
<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
const roomStore = useRoomStore()
const selectedRoom = computed(() => roomStore.room)
</script>
<template>
  <div class="flex flex-col items-center">
    <img
      :src="`https://randomuser.me/api/portraits/men/${selectedRoom.opponent.id}.jpg`"
      class="w-20 h-20 rounded-full shadow"
    />
    <h4 class="text-lg font-semibold text-gray-700 dark:text-white">
      {{ selectedRoom.opponent.name }}
    </h4>
    <p class="text-gray-700 dark:text-white">{{ selectedRoom.opponent.email }}</p>
  </div>
</template>
