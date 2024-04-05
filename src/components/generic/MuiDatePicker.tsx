import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface MuiDatePickerProps {
  date: Date;
  handleChange: (date: Date) => void;
}

export function MuiDatePicker({ date, handleChange }: MuiDatePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(date));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          if (newValue) handleChange(newValue.toDate());
        }}
      />
    </LocalizationProvider>
  );
}
