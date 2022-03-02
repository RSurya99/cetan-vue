<script setup lang="ts"></script>
<template>
  <div class="w-full mt-4 px-2">
    <div class="relative">
      <input
        class="w-full bg-gray-100 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none text-left rounded-lg shadow-md sm:text-sm overflow-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-300"
        placeholder="Search user email"
        autocomplete="off"
        type="text"
      />
      <IconMdiMagnify class="absolute top-0 right-0 mr-3 my-2 text-gray-500" />
    </div>
  </div>
</template>
