<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import NProgress from 'nprogress'
import useAuthValidation from '@/composables/authValidation'

const { errors, email, password, validate } = useAuthValidation()

const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const router = useRouter()

const isLoading = computed(() => loadingStore.isLoading)

const formSubmit = function () {
  validate()
  if (errors.value.length === 0) {
    loadingStore.setLoading(true)
    authStore
      .loginEvent({ email: email.value, password: password.value })
      .then(() => {
        loadingStore.setLoading(false)
        router.push('/')
      })
      .catch((err) => {
        loadingStore.setLoading(false)
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
      <BuilderAuthBaseHeader title="Cetan 💬" subtitle="Please login first before using this app" />

      <form @submit.prevent="formSubmit" class="w-full mt-6">
        <FormInput name="email" placeholder="example@domain.com" :errors="errors" v-model="email" />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          :errors="errors"
          v-model="password"
          class="mt-6"
        />
        <RouterLink
          to="/forgot-password"
          class="inline-block text-sm text-gray-500 font-medium mt-2 hover:text-gray-600 transition duration-300"
        >
          Forgot Password?
        </RouterLink>
        <BuilderBaseButton type="submit" :disabled="isLoading">
          <IconMdiLoading v-if="isLoading" class="animate-spin mx-auto text-xl" />
          <span v-else>Sign In</span>
        </BuilderBaseButton>
      </form>
      <BuilderAuthBaseFooter
        text="Don't have an account yet?"
        :link="{ text: 'Register now', to: '/register' }"
      />
    </PageAuthBaseSection>
  </PageAuthBaseWrapper>
</template>
