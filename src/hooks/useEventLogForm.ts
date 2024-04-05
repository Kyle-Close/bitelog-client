import { useState } from 'react';

export interface EventLogFormState {
  timeStamp: Date;
}

export function useEventLogForm(initialState?: EventLogFormState) {
  const [timeStamp, setTimestamp] = useState(
    initialState ? initialState.timeStamp : new Date()
  );
  const [note, setNote] = useState(initialState ? initialState : '');
  const [discomfortLevel, setDiscomfortLevel] = useState<number | null>(null);

  const handleDateChange = (date: Date) => {
    setTimestamp(date);
  };

  const handleUpdateNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote(e.target.value);
  };

  const handleUpdateDiscomfortLevel = (discomfortLevel: number) => {
    if (discomfortLevel === 0) setDiscomfortLevel(null);
    else setDiscomfortLevel(discomfortLevel);
  };

  return {
    handleDateChange,
    timeStamp,
    handleUpdateNote,
    note,
    handleUpdateDiscomfortLevel,
  };
}
