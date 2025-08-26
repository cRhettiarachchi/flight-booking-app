const createBooking = async (bookingData: any): Promise<{ message: string; success: boolean }> => {
  // Console log the booking request body as requested
  console.log('📋 Booking Request Body:', bookingData)
  
  // Return simple success response
  return {
    message: 'Booking created successfully',
    success: true
  }
}

export const bookingService = {
  createBooking,
}
