<script lang="ts">
export default {
  name: 'InfobarProfile',
}
</script>
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { toggleDark } from '@/composables'
</script>
<template>
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
          <ul>
            <li class="px-2 py-3 hover:bg-gray-100 rounded-md">
              <button type="button" class="flex items-center space-x-2" @click="toggleDark">
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
</template>
