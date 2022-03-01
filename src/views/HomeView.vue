<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]
let selected = ref('')
let query = ref('')

let filteredPeople = computed(() =>
  query.value === ''
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
const message = ref('')
const sendMessage = function () {
  alert('oke')
}
const sideInfo = ref(true)
const profileMenu = ref(false)
</script>
<template>
  <div class="w-full max-h-screen overflow-hidden">
    <div class="grid grid-cols-12 divide-x divide-gray-300">
      <div class="col-span-3 px-2 py-4">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center space-x-4 px-2">
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              class="w-10 h-10 rounded-full shadow-sm"
            />
            <h2 class="text-2xl font-bold text-gray-700 dark:text-white">Chats</h2>
          </div>
          <div class="relative">
            <button
              @click="profileMenu = !profileMenu"
              class="p-2 bg-gray-200 group hover:bg-emerald-300 rounded-full shadow-sm transition duration-300"
            >
              <IconMdiDotsHorizontal
                class="text-gray-500 group-hover:text-white text-sm"
                aria-hidden="true"
              />
            </button>
            <div
              v-if="profileMenu"
              class="absolute -left-24 w-32 z-10 py-1 bg-white rounded-md shadow-md"
            >
              <ul>
                <li>
                  <button
                    class="w-full text-left text-sm text-gray-700 font-medium px-4 py-2 hover:bg-emerald-100"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    class="w-full text-left text-sm text-gray-700 font-medium px-4 py-2 hover:bg-emerald-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full mt-4 px-2">
          <Combobox v-model="selected">
            <div class="relative mt-1">
              <div class="relative w-full">
                <ComboboxInput
                  class="w-full bg-gray-100 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none text-left rounded-lg shadow-md sm:text-sm overflow-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-300"
                  placeholder="Search user email"
                  autocomplete="off"
                  @change="query = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <IconMdiMagnify class="w-5 h-5 text-emerald-500" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredPeople.length === 0 && query !== ''"
                    class="cursor-default select-none relative py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="person in filteredPeople"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                  >
                    <li
                      class="cursor-default select-none relative py-2 pl-10 pr-4"
                      :class="{
                        'text-white bg-emerald-600': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{ 'font-medium': selected, 'font-normal': !selected }"
                      >
                        {{ person.name }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-emerald-600': !active }"
                      >
                        <IconMdiCheck aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="h-[78vh] mt-6 space-y-2 overflow-auto">
          <button
            v-for="i in 12"
            :key="i"
            type="button"
            class="w-full flex items-center space-x-4 px-4 py-2 text-left hover:bg-emerald-100 rounded-md hover:shadow-sm transition duration-300"
          >
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              class="w-12 h-12 rounded-full shadow-sm"
            />
            <div class="grow space-y-1">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-gray-700">Adam Ananta</h4>
                <span class="text-xs text-gray-500">&middot; 5 Minggu</span>
              </div>
              <p class="truncate text-xs text-gray-500">You: Wah thank you banget dam</p>
            </div>
          </button>
        </div>
      </div>
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
