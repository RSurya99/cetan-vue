<script lang="ts">
export default {
  name: 'FormInput',
}
</script>
<script setup lang="ts">
import { PropType } from 'vue'
interface Errors {
  field: string
  message: string
}
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  errors: {
    type: Array as PropType<Errors[]>,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
const isEyeClicked = ref(false)

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const capitalizeName = computed(() => props.name.charAt(0).toUpperCase() + props.name.slice(1))
const inputType = computed(() => {
  if (props.type === 'password') {
    return isEyeClicked.value ? 'text' : 'password'
  }
  return props.type
})
</script>
<template>
  <div class="flex flex-col" v-bind="$attrs">
    <label :for="props.name" class="text-sm text-gray-500 font-medium mb-1">
      {{ capitalizeName }}
    </label>
    <div class="relative">
      <input
        v-model="value"
        :type="inputType"
        :name="props.name"
        :id="props.name"
        :placeholder="props.placeholder"
        autocomplete="off"
        class="w-full px-4 py-2 bg-emerald-50 text-gray-700 placeholder-gray-500 font-medium rounded-md shadow focus:outline-none focus:border-0 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300"
      />
      <button
        v-if="props.type === 'password'"
        type="button"
        @click="isEyeClicked = !isEyeClicked"
        class="absolute top-0 right-0 mx-4 mt-2 text-lg text-emerald-500"
      >
        <IconMdiEye v-if="isEyeClicked" />
        <IconMdiEyeOff v-else />
      </button>
    </div>
    <slot name="errors">
      <div v-for="error in errors" :key="error.field">
        <span v-if="error.field === props.name" class="text-sm text-rose-500 font-medium">
          {{ error.message }}
        </span>
      </div>
    </slot>
  </div>
</template>
