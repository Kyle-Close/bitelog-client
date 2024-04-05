import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useScreenSize } from '../../hooks/useScreenSize';

interface MuiDateTimePickerProps {
  date: Date;
  handleChange: (date: Date) => void;
}

export function MuiDateTimePicker({
  date,
  handleChange,
}: MuiDateTimePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(date));
  const screenSize = useScreenSize();
  const isMobile = screenSize === 'xs';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isMobile ? (
        <MobileDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            if (newValue) handleChange(newValue.toDate());
          }}
        />
      ) : (
        <DateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            if (newValue) handleChange(newValue.toDate());
          }}
        />
      )}
    </LocalizationProvider>
  );
}
