<script lang="ts">
export default {
  name: 'MainNavbar',
}
</script>
<script setup lang="ts">
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const selectedRoom = computed(() => roomStore.room)
const emit = defineEmits(['toggleInfobar'])

const buttonClick = function () {
  emit('toggleInfobar')
}
</script>
<template>
  <div
    class="w-full border-b border-gray-300 px-4 py-2 flex items-center"
    :class="!roomStore.isSelectedRoomEmpty ? 'justify-between' : 'justify-end'"
  >
    <div class="flex items-center space-x-2" v-if="!roomStore.isSelectedRoomEmpty">
      <img
        :src="`https://randomuser.me/api/portraits/men/${selectedRoom.opponent.id}.jpg`"
        class="w-12 h-12 rounded-full shadow-sm"
      />
      <div class="flex flex-col">
        <h4 class="font-semibold text-gray-700 dark:text-white">
          {{ selectedRoom.opponent.name }}
        </h4>
        <span class="text-xs text-gray-500 dark:text-gray-100">Aktif 4 jam lalu</span>
      </div>
    </div>
    <div>
      <button
        @click="buttonClick"
        class="p-2 bg-gray-200 dark:bg-white group hover:bg-emerald-300 dark:hover:bg-emerald-500 rounded-full shadow-sm transition duration-300"
      >
        <IconMdiDotsHorizontal
          class="text-gray-500 dark:text-emerald-500 group-hover:text-white"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>
