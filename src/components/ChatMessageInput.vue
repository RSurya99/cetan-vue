<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:message'])
const chatInput = (event) => {
  emit('update:message', event.target.value)
}
</script>
<template>
  <div class="w-full">
    <input
      type="text"
      class="focus:outline-none focus:ring-0 block w-full px-4 py-2 bg-emerald-100 dark:bg-white focus:border focus:border-emerald-500 rounded-md transition duration-300"
      placeholder="Type a message"
      :value="props.message"
      @input="chatInput"
    />
  </div>
</template>
