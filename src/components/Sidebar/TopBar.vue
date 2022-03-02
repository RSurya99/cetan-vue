<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'

const authStore = useAuthStore()
const router = useRouter()
const profileMenu = ref(false)
const user = computed(() => authStore.user)

const logout = function () {
  authStore
    .logoutEvent()
    .then(() => {
      console.log('berhasil logout')
      router.push('/login')
    })
    .catch((err) => {
      console.log(err, 'gagal logout')
      NProgress.done()
    })
}
</script>
<template>
  <div class="w-full flex items-center justify-between">
    <div class="flex items-center space-x-4 px-2">
      <img
        :src="`https://randomuser.me/api/portraits/men/${user.id}.jpg`"
        class="w-10 h-10 rounded-full shadow-sm"
      />
      <h2 class="text-2xl font-bold text-emerald-500 dark:text-white">Cetan</h2>
    </div>
    <div class="relative">
      <button
        @click="profileMenu = !profileMenu"
        class="p-2 bg-gray-200 dark:bg-white group hover:bg-emerald-300 dark:hover:bg-emerald-500 rounded-full shadow-sm transition duration-300"
      >
        <IconMdiDotsHorizontal
          class="text-gray-500 dark:text-emerald-500 group-hover:text-white text-sm"
          aria-hidden="true"
        />
      </button>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
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
                @click="logout"
                class="w-full text-left text-sm text-gray-700 font-medium px-4 py-2 hover:bg-emerald-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
