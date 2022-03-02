<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const authStore = useAuthStore()
const props = defineProps({
  room: {
    type: Object,
    default: () => ({}),
  },
  skeleton: {
    type: Boolean,
    default: false,
  },
})

const lastMessageFrom = computed(() => {
  if (authStore.isAuthenticated) {
    const fromId = props.room.messages.at(-1).from
    if (fromId === props.room.self.id) {
      return 'you'
    } else {
      return props.room.opponent.name.split(' ')[0]
    }
  } else {
    return ''
  }
})

const lastMessage = computed(() => {
  if (authStore.isAuthenticated) {
    return props.room.messages.at(-1).message.substring(0, 30)
  } else {
    return ''
  }
})

const roomClick = function () {
  roomStore.getSelectedRoom(props.room.room_id).catch((err) => {
    console.log(err, 'terjadi kesalahan ketika fetch room/id')
  })
}
</script>
<template>
  <div v-if="props.skeleton" class="w-full flex items-center animate-pulse space-x-2 p-2">
    <div class="w-12 h-12 rounded-full shadow-sm bg-emerald-200"></div>
    <div class="grow space-y-3">
      <div class="flex justify-between">
        <div class="w-32 h- rounded-md bg-emerald-200"></div>
        <div class="w-16 h-4 rounded-md bg-emerald-100"></div>
      </div>
      <div class="w-38 h-3 rounded-md bg-emerald-100"></div>
    </div>
  </div>
  <button
    v-else
    @click="roomClick"
    class="w-full flex items-center space-x-2 p-2 text-left dark:bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-emerald-100 rounded-md hover:shadow-sm transition duration-300"
  >
    <img
      :src="`https://randomuser.me/api/portraits/men/${props.room.room_id}.jpg`"
      class="w-12 h-12 rounded-full shadow dark:shadow-gray-500"
    />
    <div class="grow space-y-1">
      <div class="flex items-center justify-between">
        <h4 class="font-medium dark:text-white text-gray-700">
          {{ props.room.opponent.name.substring(0, 15) }}
        </h4>
        <span class="text-xs dark:text-gray-100 text-gray-500">{{
          props.room.messages.at(-1).created_at
        }}</span>
      </div>
      <p class="truncate text-xs dark:text-gray-100 text-gray-500">
        {{ lastMessageFrom }}: {{ lastMessage }}
      </p>
    </div>
  </button>
</template>
