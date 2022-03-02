<script setup lang="ts">
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const message = ref('')
const room = computed(() => roomStore.selectedRoom)
const sendMessage = function () {
  roomStore
    .sendMessageEvent({
      room_id: room.value.room_id,
      message: message.value,
    })
    .then(() => {
      alert('pesan berhasil dikirim')
      message.value = ''
    })
    .catch((err) => {
      console.log('err', err)
    })
}
</script>
<template>
  <section class="w-full h-[10%] px-4 py-2">
    <div v-if="roomStore.isSelectedRoomEmpty" class="flex items-center justify-between space-x-4">
      <button>
        <IconMdiEmoticonOutline class="text-emerald-500 text-xl" />
      </button>
      <button>
        <IconMdiPaperclip class="text-emerald-500 text-xl" />
      </button>
      <form @submit.prevent="sendMessage" class="w-full flex items-center space-x-4">
        <ChatMessageInput v-model="message" />
        <button type="submit">
          <IconMdiSend class="text-emerald-500 text-xl" />
        </button>
      </form>
    </div>
  </section>
</template>
