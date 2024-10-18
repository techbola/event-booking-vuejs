<template>
  <SectionCard>
    <template #header>
      {{ title }}
    </template>

    <div class="space-y-2">
      <p class="text-sm">{{ eventDate }}</p>
      <p>{{ description }}</p>
    </div>

    <template #footer>
      <div class="flex justify-end p-4">
        <RoundButton @click="$emit('register')"> Register </RoundButton>
      </div>
    </template>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'

defineProps({
  title: String,
  eventDate: String,
  description: String,
})

defineEmits(['register'])
</script>
