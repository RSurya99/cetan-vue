<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const rooms = computed(() => store.getters['room/rooms'])
const room = computed(() => store.getters['room/selectedRoom'])

onMounted(() => {
  store.dispatch('room/getRoomsEvent').catch((err) => {
    console.log(err, 'terjadi kesalahan ketika fetch')
  })

  const getAllRoom = function (id) {
    if (id) {
      store.dispatch('room/getRoomsEvent', room.value.room_id)
    }
  }

  window.Echo.channel('Cetan-app').listen('.message-notification', (e) => {
    if (e && e != undefined) {
      if (rooms.value.length > 0) {
        if (e.to === rooms.value[0].self.id || e.rooms === Number(room.value.room_id)) {
          getAllRoom(e.id)
        }
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
