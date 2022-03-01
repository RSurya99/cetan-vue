<script setup lang="ts">
import { PropType } from 'vue'
const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit'>,
    default: 'button',
  },
  text: {
    type: String,
    default: '',
  },
})
</script>
<template>
  <button
    :type="props.type"
    class="inline-block w-full px-4 py-2 mt-8 bg-emerald-500 hover:bg-emerald-400 rounded-md shadow text-white font-medium transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform active:scale-95"
  >
    <slot>
      {{ props.text }}
    </slot>
  </button>
</template>
