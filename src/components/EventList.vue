<template>
  <template v-if="errorMessage">
    <ErrorCard :retry="fetchEvents">
      <div>{{ errorMessage }}</div>
    </ErrorCard>
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
import ErrorCard from '@/components/ErrorCard.vue'

import useBookings from '@/composables/useBookings'

const { handleEventRegistration } = useBookings()

const events = ref([])
const loading = ref(false)
const errorMessage = ref('')

const fetchEvents = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:3001/events')

    if (!response.ok) {
      errorMessage.value = 'Could not fetch events.'
      throw new Error(errorMessage.value)
    } else {
      const data = await response.json()
      events.value = data
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvents()
})
</script>
