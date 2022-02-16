<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import NProgress from 'nprogress'
import { onClickOutside } from '@vueuse/core'

const store = useStore()
const searchResult = ref(false)
const isResultIn = ref(false)
const keyword = ref('')
const searchRef = ref(null)

onClickOutside(searchRef, () => (searchResult.value = false))
const userFind = computed(() => store.getters['chat/userFind'])

const userClick = function () {
  NProgress.start()
  store.dispatch('room/addRoomEvent', { id: store.state.chat.userFind.id }).catch((err) => {
    console.log(err, 'terjadi kesalahan ketika fetch room/id')
    NProgress.done()
  })
}

const findUser = function () {
  NProgress.start()
  store
    .dispatch('chat/findUserEvent', {
      email: keyword.value,
    })
    .then(() => {
      isResultIn.value = true
    })
    .catch((err) => {
      console.log('err user tidak ditemukan', err)
      isResultIn.value = false
      NProgress.done()
    })
  searchResult.value = true
}
</script>
<template>
  <li class="relative p-2 border-b border-gray-200">
    <form @submit.prevent="findUser" class="mt-1 w-full relative rounded-md shadow-sm border border-gray-300">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <button type="submit">
          <IconHeroiconsOutlineSearch class="text-gray-500 text-sm" />
        </button>
      </div>
      <input
        type="email"
        name="price"
        id="price"
        v-model="keyword"
        class="focus:outline-none focus:ring-0 block w-full px-12 py-2 text-sm border-gray-300 rounded-md"
        placeholder="Search user or start new chat"
        autocomplete="off"
      />
    </form>
    <div
      v-if="searchResult"
      ref="searchRef"
      class="absolute top-12 left-0 z-10 w-[95%] mx-2 rounded-md shadow-sm bg-white border border-gray-300"
    >
      <ul>
        <li v-if="!isResultIn" class="w-full p-2">
          <h3 class="font-medium text-gray-700 text-center">There is no user with that email</h3>
        </li>
        <li v-if="isResultIn" class="w-full">
          <button
            @click="userClick"
            class="w-full flex items-center space-x-4 p-2 hover:bg-gray-100 transition duration-200"
          >
            <img src="https://randomuser.me/api/portraits/men/59.jpg" class="w-8 h-8 rounded-full" alt="" />
            <h3 class="font-medium text-gray-700">{{ userFind.name }}</h3>
          </button>
        </li>
      </ul>
    </div>
  </li>
</template>
