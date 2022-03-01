<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import useAuthValidation from '@/composables/authValidation'

const { errors, email, password, validate } = useAuthValidation()

const authStore = useAuthStore()
const router = useRouter()
const isEyeClicked = ref(false)

const formSubmit = function () {
  validate()

  if (errors.value.length === 0) {
    authStore
      .loginEvent({ email: email.value, password: password.value })
      .then(() => {
        router.push('/')
      })
      .catch((err) => {
        console.log('error login', err)
        alert('login gagal')
        NProgress.done()
      })
  }
}
</script>
<template>
  <PageAuthBaseWrapper>
    <PageAuthBaseSection>
      <BuilderAuthBaseHeader title="Cetan 👋" subtitle="Please login first before using this app" />

      <form @submit.prevent="formSubmit" class="w-full mt-6">
        <div class="flex flex-col">
          <label for="email" class="text-sm text-gray-500 font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="text"
            name="email"
            id="email"
            autocomplete="off"
            placeholder="example@domain.com"
            class="w-full px-4 py-2 bg-emerald-50 text-gray-700 placeholder-gray-500 font-medium rounded-md shadow focus:outline-none focus:border-0 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
          />
          <div v-for="error in errors" :key="error.field">
            <span v-if="error.field === 'email'" class="text-sm text-rose-500 font-medium">
              {{ error.message }}
            </span>
          </div>
        </div>
        <div class="w-full flex flex-col mt-6">
          <label for="password" class="text-sm text-gray-500 font-medium mb-1">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="isEyeClicked ? 'text' : 'password'"
              name="password"
              id="password"
              autocomplete="off"
              placeholder="Password"
              class="w-full px-4 py-2 bg-emerald-50 text-gray-700 placeholder-gray-500 font-medium rounded-md shadow focus:outline-none focus:border-0 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
            />
            <button
              type="button"
              @click="isEyeClicked = !isEyeClicked"
              class="absolute top-0 right-0 mx-4 mt-2 text-lg text-emerald-500"
            >
              <IconMdiEye v-if="isEyeClicked" />
              <IconMdiEyeOff v-else />
            </button>
          </div>
          <div v-for="error in errors" :key="error.field">
            <span v-if="error.field === 'password'" class="text-sm text-rose-500 font-medium">
              {{ error.message }}
            </span>
          </div>
          <a
            href="#"
            class="text-sm text-gray-500 font-medium mt-2 hover:text-gray-600 transition duration-300"
            >Forgot Password?</a
          >
        </div>
        <button
          type="submit"
          class="inline-block w-full px-4 py-2 mt-8 bg-emerald-500 hover:bg-emerald-400 rounded-md shadow text-white font-medium transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform active:scale-95"
        >
          Sign In
        </button>
      </form>
      <BuilderAuthBaseFooter
        text="Don't have an account yet?"
        :link="{ text: 'Register now', to: '/register' }"
      />
    </PageAuthBaseSection>
  </PageAuthBaseWrapper>
</template>
