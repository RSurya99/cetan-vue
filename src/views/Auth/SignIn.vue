<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import useAuthValidation from '@/composables/authValidation'

const { errors, email, password, validate } = useAuthValidation()

const authStore = useAuthStore()
const router = useRouter()

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
        <FormInput name="email" placeholder="example@domain.com" :errors="errors" v-model="email" />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          :errors="errors"
          v-model="password"
          class="mt-6"
        />
        <BuilderBaseButton type="submit" text="Sign In" />
      </form>
      <BuilderAuthBaseFooter
        text="Don't have an account yet?"
        :link="{ text: 'Register now', to: '/register' }"
      />
    </PageAuthBaseSection>
  </PageAuthBaseWrapper>
</template>
