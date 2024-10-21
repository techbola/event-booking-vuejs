import { ref, onMounted } from 'vue'

// TODO: Replace with user id after auth
const userId = 1
const bookings = ref([])
const loading = ref(false)

const fetchBookings = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3001/bookings')
    const data = await response.json()
    bookings.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const findBookingIndex = id => {
  return bookings.value.findIndex(booking => booking.id === id)
}

const handleEventRegistration = async event => {
  if (
    bookings.value.some(booking => booking.eventId === event.id && userId === 1)
  ) {
    alert('You have already registered for this event')
    return
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: '1',
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending',
  }

  bookings.value.push(newBooking)

  try {
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

    if (response.ok) {
      const index = findBookingIndex(newBooking.id)
      bookings.value[index] = await response.json()
    } else {
      throw new Error('Failed to register event')
    }
  } catch (error) {
    console.error(error)
    bookings.value = bookings.value.filter(
      booking => booking.id !== newBooking.id,
    )
  }
}

const handleEventCancellation = async bookingId => {
  if (!window.confirm('Are you sure you want to cancel this booking?')) {
    return
  }

  const index = findBookingIndex(bookingId)
  const originalBooking = bookings.value[index]
  bookings.value.splice(index, 1)
  // bookings.value = bookings.value.filter(booking => booking.id !== bookingId) // another way to remove the booking

  try {
    const response = await fetch(
      `http://localhost:3001/bookings/${bookingId}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      throw new Error('Booking could not be cancelled.')
    }
  } catch (error) {
    console.error(error)
    bookings.value.splice(index, 0, originalBooking)
    // bookings.value = [...bookings.value, originalBooking] // another way to restore (add) the booking back
  }
}

export default function useBookings() {
  onMounted(async () => {})

  return {
    bookings,
    loading,
    fetchBookings,
    handleEventRegistration,
    handleEventCancellation,
  }
}
