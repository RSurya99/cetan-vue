<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useRoomStore } from '@/stores/room'
import { useLoadingStore } from '@/stores/loading'

const roomStore = useRoomStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading)
const rooms = computed(() => roomStore.rooms)
const message = ref('')
const sendMessage = function () {
  alert('oke')
}
const sideInfo = ref(true)
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
      <SidebarWrapper>
        <SidebarTopBar />
        <SidebarSearchInput />
        <div class="h-[78vh] mt-6 space-y-2 overflow-auto">
          <div v-if="isLoading">
            <SidebarChatCardSkeleton v-for="i in 7" :key="i" />
          </div>
          <div v-else>
            <SidebarChatCard v-for="(room, i) in rooms" :key="i" :room="room" />
          </div>
        </div>
      </SidebarWrapper>
      <div :class="[sideInfo ? 'col-span-6' : 'col-span-9']">
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
              @click="sideInfo = !sideInfo"
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
      <div v-if="sideInfo" class="col-span-3 px-4 py-8 flex flex-col items-center">
        <img
          src="https://randomuser.me/api/portraits/men/60.jpg"
          class="w-20 h-20 rounded-full shadow"
        />
        <h4 class="text-lg font-semibold text-gray-700">Adam Ananta</h4>
        <div class="w-full pt-4">
          <div class="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
            <Disclosure v-slot="{ open }">
              <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75"
              >
                <span>Customize Chat</span>
                <IconMdiChevronDown
                  :class="open ? 'transform rotate-180' : ''"
                  class="w-5 h-5 text-emerald-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="pt-4 pb-2 text-sm text-gray-500">
                <ul class="">
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiBrightness6 class="text-emerald-500 text-lg" />
                      <span class="text-gray-700 text-sm font-medium">Change Theme</span>
                    </button>
                  </li>
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiEmoticonNeutral class="text-emerald-500 text-lg" />
                      <span class="text-gray-700 text-sm font-medium">Change Emoji</span>
                    </button>
                  </li>
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiAccountBox class="text-emerald-500 text-lg" />
                      <span class="text-gray-700 text-sm font-medium">Change Nickname</span>
                    </button>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" v-slot="{ open }" class="mt-2">
              <DisclosureButton
                class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75"
              >
                <span>Privacy and Support</span>
                <IconMdiChevronDown
                  :class="open ? 'transform rotate-180' : ''"
                  class="w-5 h-5 text-emerald-500"
                />
              </DisclosureButton>
              <DisclosurePanel class="pt-4 pb-2 text-sm text-gray-500">
                <ul class="">
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiBlockHelper class="text-emerald-500 text-base" />
                      <span class="text-gray-700 text-sm font-medium">Block</span>
                    </button>
                  </li>
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiAlert class="text-emerald-500 text-lg" />
                      <span class="text-gray-700 text-sm font-medium">Report</span>
                    </button>
                  </li>
                  <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
                    <button type="button" class="flex items-center space-x-2">
                      <IconMdiInformation class="text-emerald-500 text-lg" />
                      <span class="text-gray-700 text-sm font-medium">About Us</span>
                    </button>
                  </li>
                </ul>
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
