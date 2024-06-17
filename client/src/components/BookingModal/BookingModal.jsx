import React, { useState, useContext } from 'react';
import { Modal, Button } from '@mantine/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Import custom styles
import { useMutation } from 'react-query';
import UserDetailContext from '../../context/UserDetailContext.js';
import { bookVisit } from '../../utils/api.js';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import '@mantine/core/styles.css';

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const { userDetails: { token }, setUserDetails } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success('You have booked your visit', {
      position: 'bottom-right',
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...(prev.bookings || []), // Ensure bookings is an array
        {
          id: propertyId,
          date: dayjs(value).format('DD/MM/YYYY'),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: '1rem' }}>
        <Calendar onChange={setValue} value={value} minDate={new Date()} />
        <Button onClick={() => mutate()} disabled={!value || isLoading}>
          {isLoading ? 'Booking...' : 'Book visit'}
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
