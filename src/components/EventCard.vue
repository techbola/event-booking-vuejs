<template>
  <div class="border border-gray-200 bg-white rounded-md">
    <h3 class="p-4 font-medium text-xl border-b border-gray-200">
      {{ title }}
    </h3>
    <p class="p-4 border-b border-gray-200">{{ eventDate }}</p>
    <p class="p-4">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  eventDate: String,
  description: String,
})
</script>

<style lang="scss" scoped></style>
