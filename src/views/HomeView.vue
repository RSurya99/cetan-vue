<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
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
</script>
<template>
  <div class="w-full max-h-screen overflow-hidden">
    <div class="grid grid-cols-12 divide-x divide-gray-300">
      <div class="col-span-3 px-2 py-4">
        <div class="flex items-center space-x-4 px-2">
          <img
            src="https://randomuser.me/api/portraits/men/60.jpg"
            class="w-10 h-10 rounded-full"
          />
          <h2 class="text-2xl font-bold text-gray-700 dark:text-white">Chat</h2>
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
                  <IconMdiMagnify class="w-5 h-5 text-gray-400" aria-hidden="true" />
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
        <div class="h-[78vh] mt-6 space-y-2 overflow-auto px-2">
          <button
            v-for="i in 12"
            :key="i"
            type="button"
            class="w-full flex items-center space-x-4 p-2 text-left hover:bg-gray-100 rounded-md hover:shadow-sm transition duration-300"
          >
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              class="w-12 h-12 rounded-full"
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
      <div class="col-span-6 px-6 py-4">this is 6 col</div>
      <div class="col-span-3 px-6 py-4">this is 3 col</div>
    </div>
  </div>
</template>
