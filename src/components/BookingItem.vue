<template>
  <SectionCard>
    <div>
      {{ title }}
    </div>
    <RoundButton @click="$emit('cancel')"> Cancel </RoundButton>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'

defineProps({
  title: String,
})

defineEmits(['cancel'])
</script>
