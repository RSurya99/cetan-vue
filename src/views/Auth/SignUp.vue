<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'

const authStore = useAuthStore()
const router = useRouter()

interface ErrorMessage {
  field: string
  message: string
}

const name = ref('')
const email = ref('')
const password = ref('')
const isEyeClicked = ref(false)
const errors = ref([] as ErrorMessage[])

const validateEmail = function (email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const formSubmit = function () {
  errors.value = []
  if (email.value === '' || password.value === '' || name.value === '') {
    if (email.value === '') {
      errors.value = [
        ...errors.value,
        {
          field: 'email',
          message: 'Email field is required',
        },
      ]
    }
    if (password.value === '') {
      errors.value = [
        ...errors.value,
        {
          field: 'password',
          message: 'Password field is required',
        },
      ]
    }
    if (name.value === '') {
      errors.value = [
        ...errors.value,
        {
          field: 'name',
          message: 'Name field is required',
        },
      ]
    }
  } else if (validateEmail(email.value) === null) {
    errors.value = [
      ...errors.value,
      {
        field: 'email',
        message: 'Email is not valid',
      },
    ]
  } else if (password.value.length < 6) {
    errors.value = [
      ...errors.value,
      {
        field: 'password',
        message: 'Password must be at least 6 characters',
      },
    ]
  } else {
    errors.value = []
  }

  if (errors.value.length === 0) {
    authStore
      .registerEvent({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        alert('berhasil register')
        router.push('/login')
      })
      .catch(() => {
        NProgress.done()
      })
  }
}
</script>
<template>
  <section
    class="w-full h-full sm:min-h-screen bg-gradient-to-r from-green-500 to-emerald-500 flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center sm:my-10 px-8 sm:px-14 py-20 sm:py-8 bg-white shadow-xl sm:rounded-xl w-full sm:max-w-[550px]"
    >
      <h1 class="text-4xl font-bold text-emerald-500">Hello 👋</h1>
      <p class="text-gray-500 font-medium leading-relaxed mt-2">
        Create your account by filling out this form
      </p>
      <form @submit.prevent="formSubmit" class="w-full mt-6">
        <div class="flex flex-col">
          <label for="name" class="text-sm text-gray-500 font-medium mb-1">Fullname</label>
          <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            autocomplete="off"
            placeholder="John Doe"
            class="w-full px-4 py-2 bg-emerald-50 text-gray-700 placeholder-gray-500 font-medium rounded-md shadow focus:outline-none focus:border-0 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
          />
          <div v-for="error in errors" :key="error.field">
            <span v-if="error.field === 'name'" class="text-sm text-rose-500 font-medium">
              {{ error.message }}
            </span>
          </div>
        </div>
        <div class="flex flex-col mt-6">
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
          Sign Up
        </button>
      </form>
      <span class="text-sm text-gray-500 font-medium mt-6">
        Already have an account?
        <RouterLink to="/login" class="underline hover:text-gray-600 transition duration-300">
          Login here
        </RouterLink>
      </span>
    </div>
  </section>
</template>
