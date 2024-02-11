import { useQueries } from '@tanstack/react-query';
import { User } from '../contexts';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';

function useGetAllJournalEvents(user?: User | null) {
  const isEnabled = user && user.journalId; // Determine if queries should be enabled

  const queries = useQueries({
    queries: [
      {
        queryKey: ['eatLogs', user?.uid, user?.journalId],
        queryFn: () =>
          makeRequestToBackend({
            url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs?time=24`,
          }),
        enabled: !!isEnabled,
      },
      {
        queryKey: ['eventLogs', user?.uid, user?.journalId],
        queryFn: () =>
          makeRequestToBackend({
            url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/report_logs?time=24`,
          }),
        enabled: !!isEnabled,
      },
    ],
  });

  return queries;
}

export default useGetAllJournalEvents;
