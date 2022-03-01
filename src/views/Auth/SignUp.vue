<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NProgress from 'nprogress'
import useAuthValidation from '@/composables/authValidation'

const { errors, email, password, name, validate } = useAuthValidation()

const authStore = useAuthStore()
const router = useRouter()

const formSubmit = function () {
  validate('signUp')

  if (errors.value.length === 0) {
    authStore
      .registerEvent({
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        NProgress.done()
      })
  }
}
</script>
<template>
  <PageAuthBaseWrapper>
    <PageAuthBaseSection>
      <BuilderAuthBaseHeader
        title="Hello 👋"
        subtitle="Create your account by filling out this form"
      />

      <form @submit.prevent="formSubmit" class="w-full mt-6">
        <FormInput name="name" placeholder="John Doe" :errors="errors" v-model="name" />
        <FormInput
          name="email"
          placeholder="example@domain.com"
          :errors="errors"
          v-model="email"
          class="mt-6"
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          :errors="errors"
          v-model="password"
          class="mt-6"
        />
        <BuilderBaseButton type="submit" text="Sign Up" />
      </form>
      <BuilderAuthBaseFooter
        text="Already have an account?"
        :link="{ text: 'Login here', to: '/login' }"
      />
    </PageAuthBaseSection>
  </PageAuthBaseWrapper>
</template>
