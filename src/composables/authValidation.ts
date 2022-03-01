import type { ErrorMessage } from '@/types'

const validateEmail = function (email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export default function () {
  const errors = ref([] as ErrorMessage[])
  const email = ref('')
  const name = ref('')
  const password = ref('')

  errors.value = []
  function validate(type = 'signIn') {
    errors.value = []
    if (email.value === '' || validateEmail(email.value) === null) {
      if (email.value === '') {
        errors.value = [
          ...errors.value,
          {
            field: 'email',
            message: 'Email field is required',
          },
        ]
      } else if (validateEmail(email.value) === null) {
        errors.value = [
          ...errors.value,
          {
            field: 'email',
            message: 'Email is not valid',
          },
        ]
      }
    }
    if (password.value === '' || password.value.length < 6) {
      if (password.value === '') {
        errors.value = [
          ...errors.value,
          {
            field: 'password',
            message: 'Password field is required',
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
      }
    }
    if (type === 'signUp') {
      if (name.value === '') {
        errors.value = [
          ...errors.value,
          {
            field: 'name',
            message: 'Name field is required',
          },
        ]
      }
    }
  }
  return {
    errors,
    email,
    name,
    password,
    validate,
  }
}
