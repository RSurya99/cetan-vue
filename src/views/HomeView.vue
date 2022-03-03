<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'

const roomStore = useRoomStore()
const loadingStore = useLoadingStore()
const testId = ref(true)
const roomId = ref(0)

const isLoading = computed(() => loadingStore.isLoading)
const rooms = computed(() => roomStore.rooms)
const roomsLength = computed(() =>
  rooms.value.length > 0 || !isLoading.value ? rooms.value.length : 6
)
const infobar = ref(true)
onBeforeMount(() => loadingStore.setLoading(true))
onMounted(() => {
  roomStore
    .getRooms()
    .then(() => {
      loadingStore.setLoading(false)
    })
    .catch((err) => {
      loadingStore.setLoading(false)
      console.log(err, 'terjadi kesalahan ketika fetch')
    })

  window.Echo.channel('Cetan-app').listen('.message-notification', (e) => {
    if (testId.value) {
      console.log('called in sidebar listen')
      roomId.value = e.id
      roomStore.getRooms()
      testId.value = false
    } else {
      if (roomId.value != e.id) {
        testId.value = true
      }
    }
  })
})

const toggleInfobar = function () {
  infobar.value = !infobar.value
}
</script>
<template>
  <div class="w-full max-h-screen overflow-hidden">
    <div class="grid grid-cols-12 divide-x divide-gray-300">
      <!-- Sidebar -->
      <div class="col-span-3 px-2 py-4">
        <SidebarTopBar />
        <SidebarSearchInput />
        <div class="h-[78vh] mt-6 space-y-2 overflow-auto">
          <SidebarChatCard
            v-for="i in roomsLength"
            :key="i"
            :room="roomsLength > 0 ? rooms[i - 1] : {}"
            :skeleton="isLoading"
          />
          <div v-if="roomsLength === 0">
            <h3 class="text-xl font-semibold text-gray-700 dark:text-white text-center">
              No chat found
            </h3>
          </div>
        </div>
      </div>
      <!-- Main -->
      <div :class="[infobar && !roomStore.isSelectedRoomEmpty ? 'col-span-6' : 'col-span-9']">
        <MainNavbar @toggle-infobar="toggleInfobar()" />
        <MainChatBox />
        <MainAddChat />
      </div>
      <!-- Infobar -->
      <div v-if="infobar && !roomStore.isSelectedRoomEmpty" class="col-span-3 px-4 py-8">
        <InfobarProfile />
        <InfobarAccordion />
      </div>
    </div>
  </div>
</template>
