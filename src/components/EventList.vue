<template>
  <template v-if="error">
    <SectionCard>
      <div class="space-y-4 flex flex-col items-center">
        <div class="text-red-500">{{ error }}</div>
        <div>
          <RoundButton @click="fetchEvents"> Retry now </RoundButton>
        </div>
      </div>
    </SectionCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <template v-if="!loading">
        <template v-if="events.length">
          <EventCard
            v-for="event in events"
            :key="event.id"
            :title="event.title"
            :event-date="event.date"
            :description="event.description"
            @register="handleEventRegistration(event)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">No events yet.</div>
        </template>
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import EventCard from '@/components/EventCard.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import SectionCard from '@/components/SectionCard.vue'
import RoundButton from '@/components/RoundButton.vue'

import useBookings from '@/composables/useBookings'

const { handleEventRegistration } = useBookings()

const events = ref([])
const loading = ref(false)
const error = ref(null)

const fetchEvents = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('http://localhost:3001/events')

    if (!response.ok) {
      error.value = 'Could not fetch events.'
    } else {
      const data = await response.json()
      events.value = data
    }
  } catch (error) {
    console.error(error)
    error.value = error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvents()
})
</script>
