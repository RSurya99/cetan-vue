<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'

const roomStore = useRoomStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)
const rooms = computed(() => roomStore.rooms)
const roomsLength = computed(() => (rooms.value.length > 0 ? rooms.value.length : 6))
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
        </div>
      </div>
      <!-- Main -->
      <div :class="[infobar ? 'col-span-6' : 'col-span-9']">
        <MainNavbar @toggle-infobar="toggleInfobar()" />
        <MainChatBox />
        <MainAddChat />
      </div>
      <!-- Inforbar -->
      <div v-if="infobar" class="col-span-3 px-4 py-8">
        <InfobarProfile />
        <InfobarAccordion />
      </div>
    </div>
  </div>
</template>
