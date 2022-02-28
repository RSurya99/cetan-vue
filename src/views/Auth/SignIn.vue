<script setup lang="ts">
interface ErrorMessage {
  field: string
  message: string
}

const email = ref('')
const password = ref('')
const isEyeClicked = ref(false)
const errors = ref([] as ErrorMessage[])

const formSubmit = function () {
  errors.value = []
  if (email.value === '' || password.value === '') {
    if (email.value === '') {
      errors.value = [
        ...errors.value,
        {
          field: 'email',
          message: 'Email is required',
        },
      ]
    }
    if (password.value === '') {
      errors.value = [
        ...errors.value,
        {
          field: 'password',
          message: 'Password is required',
        },
      ]
    }
  } else {
    errors.value = []
  }

  if (errors.value.length === 0) {
    alert(email.value + password.value)
  }
}
</script>
<template>
  <section
    class="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center sm:m-10 px-8 sm:px-14 py-20 sm:py-8 bg-white shadow-xl sm:rounded-xl w-full sm:max-w-[550px]"
    >
      <h2 class="text-3xl font-bold text-gray-700">Welcome back 👋</h2>
      <form @submit.prevent="formSubmit" class="w-full mt-6">
        <div class="flex flex-col">
          <label for="email" class="text-sm text-gray-500 font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
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
      <span class="text-sm text-gray-500 font-medium my-6">or continue with</span>
      <div class="w-full flex items-center justify-between space-x-4">
        <button
          class="inline-block w-full px-4 py-2 bg-white border-2 border-emerald-500 rounded-md shadow transition duration-300 hover:shadow-md transform active:scale-95"
        >
          <IconLogosGoogleIcon class="m-auto" />
        </button>
        <button
          class="inline-block w-full px-4 py-2 bg-white border-2 border-emerald-500 rounded-md shadow transition duration-300 hover:shadow-md transform active:scale-95"
        >
          <IconLogosGithubIcon class="m-auto" />
        </button>
        <button
          class="inline-block w-full px-4 py-2 bg-white border-2 border-emerald-500 rounded-md shadow transition duration-300 hover:shadow-md transform active:scale-95"
        >
          <IconLogosFacebook class="m-auto" />
        </button>
      </div>
      <span class="text-sm text-gray-500 font-medium mt-6"
        >Don't have an account yet?
        <a href="#" class="underline hover:text-gray-600 transition duration-300"
          >Register now</a
        ></span
      >
    </div>
  </section>
</template>
