import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  handleChange: (date: Date) => void;
}

export function CustomDatePicker({ handleChange }: CustomDatePickerProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const onDateChange = (date: Date) => {
    handleChange(date);
    setStartDate(date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onDateChange}
      showTimeSelect
      timeFormat='HH:mm'
      timeIntervals={15}
      dateFormat='MMMM d, yyyy h:mm aa'
    />
  );
}
