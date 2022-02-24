<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const rooms = computed(() => store.getters['room/rooms'])
const room = computed(() => store.getters['room/selectedRoom'])
const testId = ref(true)
const roomId = ref(0)

onMounted(() => {
  store.dispatch('room/getRoomsEvent').catch((err) => {
    console.log(err, 'terjadi kesalahan ketika fetch')
  })

  window.Echo.channel('Cetan-app').listen('.message-notification', (e) => {
    if (testId.value) {
      roomId.value = e.id
      store.dispatch('room/getRoomsEvent', room.value.room_id)
      testId.value = false
    } else {
      if (roomId.value != e.id) {
        testId.value = true
      }
    }
  })
})
</script>
<template>
  <aside class="w-full max-w-[340px] h-full max-h-screen border-r border-gray-200 overflow-auto">
    <ul class="space-y-2">
      <Searchbar />
      <ChatCard v-for="room in rooms" :key="room" :room="room" />
    </ul>
  </aside>
</template>
