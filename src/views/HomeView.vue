<script setup lang="ts">
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'

const roomStore = useRoomStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)
const rooms = computed(() => roomStore.rooms)
const roomsLength = computed(() => (rooms.value.length > 0 ? rooms.value.length : 6))
const message = ref('')
const sendMessage = function () {
  alert('oke')
}
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
        <div class="w-full border-b border-gray-300 px-4 py-2 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              class="w-12 h-12 rounded-full shadow-sm"
            />
            <div class="flex flex-col">
              <h4 class="font-semibold text-gray-700">Ochi</h4>
              <span class="text-xs text-gray-500">Aktif 4 jam lalu</span>
            </div>
          </div>
          <div>
            <button
              @click="infobar = !infobar"
              class="p-2 bg-gray-200 group hover:bg-emerald-300 rounded-full shadow-sm transition duration-300"
            >
              <IconMdiDotsHorizontal
                class="text-gray-500 group-hover:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- Section ChatBox -->
        <section
          id="chat-box"
          class="relative w-full h-[80vh] bg-gray-100 p-4 space-y-2 overflow-auto"
        >
          <div
            v-for="i in 18"
            :key="i"
            :class="[i % 2 === 0 ? 'justify-start' : 'justify-end']"
            class="w-full flex"
          >
            <div class="relative group cursor-default">
              <div
                :class="[i % 2 === 0 ? 'left-28' : 'right-28']"
                class="absolute top-[0.4rem] w-full hidden group-hover:block bg-gray-500 py-1 text-center text-white text-xs backdrop-blur rounded-md shadow"
              >
                2 weeks ago
              </div>
              <div class="inline-block px-4 py-2 bg-white rounded-full shadow">
                <p class="text-gray-700 leading-tight">Halo guys</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section AddChat -->
        <section class="w-full h-[10%] px-4 py-2 flex items-center justify-between space-x-4">
          <div class="relative group">
            <div
              class="absolute -top-8 -left-8 w-24 hidden bg-gray-600 backdrop-blur rounded-md shadow-md text-center text-xs font-medium text-white p-2 group-hover:hidden transition-all duration-300"
            >
              Add emoji
            </div>
            <button>
              <IconMdiEmoticonOutline class="text-emerald-500 text-xl" />
            </button>
          </div>
          <button>
            <IconMdiPaperclip class="text-emerald-500 text-xl" />
          </button>
          <form @submit.prevent="sendMessage" class="w-full flex items-center space-x-4">
            <ChatMessageInput :message="message" @update:message="message = $event" />
            <button type="submit">
              <IconMdiSend class="text-emerald-500 text-xl" />
            </button>
          </form>
        </section>
      </div>
      <!-- Inforbar -->
      <div v-if="infobar" class="col-span-3 px-4 py-8">
        <InfobarProfile />
        <InfobarAccordion />
      </div>
    </div>
  </div>
</template>
