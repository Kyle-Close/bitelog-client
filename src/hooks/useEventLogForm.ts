import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../context';
import { RequestBody, makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';

export interface EventLogFormState {
  timeStamp: Date;
  note: string;
  discomfortLevel: number;
}

export function useEventLogForm(
  initialState?: EventLogFormState,
  logId?: number
) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [timeStamp, setTimestamp] = useState(
    initialState ? initialState.timeStamp : new Date()
  );
  const [note, setNote] = useState(initialState ? initialState.note : '');
  const [discomfortLevel, setDiscomfortLevel] = useState<number | null>(
    initialState ? initialState.discomfortLevel : null
  );

  const createEventMutation = useMutation({
    mutationKey: ['eventLogs', user?.uid],
    mutationFn: () =>
      submitForm(
        `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/report_logs`,
        buildSubmitObject(timeStamp, note, discomfortLevel),
        false
      ),
    onSuccess: () => {
      resetState();
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['eventLogs', user.uid],
        });
      }
    },
  });

  const updateEventMutation = useMutation({
    mutationKey: ['eventLogs', user?.uid],
    mutationFn: () =>
      submitForm(
        `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/report_logs/${logId}`,
        buildSubmitObject(timeStamp, note, discomfortLevel),
        true
      ),
    onSuccess: () => {
      resetState();
      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: ['eventLogs', user.uid],
        });
      }
    },
  });

  const handleDateChange = (date: Date) => {
    createEventMutation.reset();
    updateEventMutation.reset();
    setTimestamp(date);
  };

  const handleUpdateNote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    createEventMutation.reset();
    updateEventMutation.reset();
    setNote(e.target.value);
  };

  const handleUpdateDiscomfortLevel = (discomfortLevel: number) => {
    createEventMutation.reset();
    updateEventMutation.reset();
    if (discomfortLevel === 0) setDiscomfortLevel(null);
    else setDiscomfortLevel(discomfortLevel);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (logId) updateEventMutation.mutate();
    else createEventMutation.mutate();
  };

  const resetState = () => {
    setTimestamp(new Date());
    setNote('');
    setDiscomfortLevel(null);
  };

  return {
    handleDateChange,
    timeStamp,
    handleUpdateNote,
    note,
    handleUpdateDiscomfortLevel,
    handleSubmit,
    createEventMutation,
    updateEventMutation,
  };
}

interface SubmitFormPayload {
  logTimestamp: string;
  notes: string;
  discomfortRating?: string;
}

const submitForm = async (
  url: string,
  payload: SubmitFormPayload,
  isUpdating: boolean
) => {
  try {
    await makeRequestToBackend({
      url,
      method: isUpdating ? 'PUT' : 'POST',
      body: payload as unknown as RequestBody,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unexpected error occurred');
  }
};

const buildSubmitObject = (
  timeStamp: Date,
  note: string,
  discomfortLevel: number | null
) => {
  if (discomfortLevel)
    return {
      logTimestamp: timeStamp.toISOString(),
      notes: note,
      discomfortRating: discomfortLevel.toString(),
    };
  else
    return {
      logTimestamp: timeStamp.toISOString(),
      notes: note,
    };
};
