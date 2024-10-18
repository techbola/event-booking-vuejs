<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>

    <h2 class="text-2xl font-medium">All Events</h2>
    <section class="grid grid-cols-2 gap-8">
      <template v-if="!loading">
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
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-8">
      <template v-if="!bookingsLoading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          @cancel="handleEventCancellation(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import LoadingBookingItem from '@/components/LoadingBookingItem.vue'

const events = ref([])
const loading = ref(false)
const bookings = ref([])
const bookingsLoading = ref(false)

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

const fetchBookings = async () => {
  bookingsLoading.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    const data = await response.json()
    bookings.value = data
  } catch (error) {
    console.error(error)
  } finally {
    bookingsLoading.value = false
  }
}

onMounted(() => {
  fetchEvents()
  fetchBookings()
})

const handleEventRegistration = async event => {
  const newBooking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
  }

  try {
    bookingsLoading.value = true
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      }),
    })

    const data = await response.json()
    bookings.value.push(data)
  } catch (error) {
    console.error(error)
  } finally {
    bookingsLoading.value = false
  }
}

const handleEventCancellation = async bookingId => {
  try {
    bookingsLoading.value = true
    await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE',
    })

    bookings.value = bookings.value.filter(booking => booking.id !== bookingId)
  } catch (error) {
    console.error(error)
  } finally {
    bookingsLoading.value = false
  }
}
</script>

<style scoped></style>
