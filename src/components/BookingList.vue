<template>
  <template v-if="errorMessage">
    <ErrorCard :retry="fetchBookings">
      <div>{{ errorMessage }}</div>
    </ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-8">
      <template v-if="!loading">
        <BookingItem
          v-for="booking in bookings"
          :key="booking.id"
          :title="booking.eventTitle"
          :status="booking.status"
          @cancel="handleEventCancellation(booking.id)"
        />
      </template>
      <template v-else>
        <LoadingBookingItem v-for="i in 4" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { onMounted } from 'vue'

import BookingItem from '@/components/BookingItem.vue'
import LoadingBookingItem from '@/components/LoadingBookingItem.vue'
import ErrorCard from '@/components/ErrorCard.vue'

import useBookings from '@/composables/useBookings'

const {
  bookings,
  loading,
  fetchBookings,
  handleEventCancellation,
  errorMessage,
} = useBookings()

onMounted(() => {
  fetchBookings()
})
</script>
