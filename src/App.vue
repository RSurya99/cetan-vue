<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
</script>
<template>
  <div class="font-sans antialiased min-h-screen max-h-screen bg-white dark:bg-gray-700 overflow-hidden">
    <nav v-if="isAuthenticated" class="bg-white shadow dark:bg-gray-800">
      <div class="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
        <div class="lg:flex lg:items-center">
          <h2 class="text-2xl font-semibold text-center text-emerald-500 capitalize">Whangsaff</h2>
          <div
            class="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center"
          >
            <NavLink route="/" name="Home" />
            <NavLink route="/profile" name="Profile" />
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>

    <main class="flex" :class="isAuthenticated ? 'h-full' : 'h-screen'">
      <MainSidebar v-if="isAuthenticated" />
      <RouterView />
    </main>
  </div>
</template>
