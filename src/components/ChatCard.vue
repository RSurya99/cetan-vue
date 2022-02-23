<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['room-click'])

const roomClick = function () {
  store
    .dispatch('room/getRoomEvent', props.room.room_id)
    .then(() => {
      emit('room-click')
    })
    .catch((err) => {
      console.log(err, 'terjadi kesalahan ketika fetch room/id')
    })
}
</script>
<template>
  <li class="px-2 w-full">
    <button
      class="w-full flex items-center space-x-2 p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition duration-300"
      @click="roomClick"
    >
      <img src="https://randomuser.me/api/portraits/men/59.jpg" class="w-12 h-12 rounded-md" alt="" />
      <div class="w-full">
        <div class="w-full flex items-center justify-between">
          <h3 class="font-semibold text-gray-700">{{ props.room.opponent.name.substring(0, 15) }}</h3>
          <span class="text-xs text-gray-700">{{ props.room.messages.at(-1).created_at }}</span>
        </div>
        <p class="text-left text-sm font-thin text-gray-500">{{ props.room.messages.at(-1).message }}</p>
      </div>
    </button>
  </li>
</template>
