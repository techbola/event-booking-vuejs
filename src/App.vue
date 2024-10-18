<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>

    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8" v-if="!loading">
      <EventCard
        v-for="event in events"
        :key="event"
        :title="event.title"
        :event-date="event.date"
        :description="event.description"
        @register="handleEventRegistration"
      />
    </section>
    <section v-else>Loading events...</section>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-8">
      <BookingItem
        v-for="event in 3"
        :key="event"
        title="Event Title"
        @cancel="handleEventCancellation"
      />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'

const events = ref([])
const loading = ref(false)

const fetchEvents = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/events')
    const data = await response.json()
    events.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEvents()
})

const handleEventRegistration = () => {
  console.log('Register')
}

const handleEventCancellation = () => {
  console.log('Cancel')
}
</script>

<style scoped></style>
