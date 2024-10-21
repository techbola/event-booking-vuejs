<template>
  <SectionCard>
    <div class="space-y-4 flex flex-col items-center">
      <div class="text-red-500"><slot /></div>
      <div>
        <RoundButton @click="retry" v-if="retry"> Retry now </RoundButton>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'

defineProps({
  retry: {
    type: Function,
    required: false,
  },
})
</script>
