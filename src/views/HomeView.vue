<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ChatNavbar from '../components/ChatNavbar.vue'
import { useStore } from 'vuex'

const store = useStore()

const room = computed(() => store.getters['room/selectedRoom'])
const userId = computed(() => store.getters['auth/user'].id)
const testId = ref(true)
const roomId = ref(0)

const message = ref('')
const sendMessage = function () {
  store
    .dispatch('chat/sendMessageEvent', {
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

onMounted(() => {
  store.dispatch('room/getRoomEvent', room.value.room_id)
  const chatBox = document.getElementById('chat-box')
  chatBox?.scrollTo(0, chatBox.scrollHeight || document.documentElement.scrollHeight)
  if (typeof window !== 'undefined') {
    window.Echo.channel('Cetan-app').listen('.message-notification', (e) => {
      if (testId.value) {
        roomId.value = e.id
        store.dispatch('room/getRoomEvent', room.value.room_id)
        testId.value = false
        chatBox?.scrollTo(0, chatBox.scrollHeight || document.documentElement.scrollHeight)
      } else {
        if (roomId.value != e.id) {
          testId.value = true
        }
      }
    })
  }
})
</script>
<template>
  <div v-if="room" class="w-full h-screen">
    <!-- Section Navbar -->
    <ChatNavbar :opponent="room.opponent" />

    <!-- Section ChatBox -->
    <section id="chat-box" class="relative w-full h-[70%] bg-gray-200 p-4 space-y-2 overflow-auto">
      <ChatBoxMessage
        v-for="message in room.messages"
        :key="message.id"
        :class="message.from === userId ? 'justify-end' : 'justify-start'"
        :message="message.message"
      />
    </section>

    <!-- Section AddChat -->
    <section class="w-full h-[10%] px-4 py-2 flex items-center justify-between space-x-4">
      <button>
        <IconHeroiconsOutlineEmojiHappy class="text-gray-500 text-xl" />
      </button>
      <button>
        <IconHeroiconsOutlinePaperClip class="text-gray-500 text-xl" />
      </button>
      <form @submit.prevent="sendMessage" class="w-full flex items-center space-x-4">
        <ChatMessageInput :message="message" @update:message="message = $event" />
        <button type="submit">
          <IconMdiSend class="text-gray-500 text-xl" />
        </button>
      </form>
    </section>
  </div>
</template>
