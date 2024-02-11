import { useQueries } from '@tanstack/react-query';
import { User } from '../contexts';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';
import { buildDateStringForQueryParam } from '../helpers/utility';

function useGetAllJournalEvents(from: Date, to: Date, user?: User | null) {
  const isEnabled = user && user.journalId; // Determine if queries should be enabled
  const fromString = buildDateStringForQueryParam(from);
  const toString = buildDateStringForQueryParam(to);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['eatLogs', user?.uid, user?.journalId, from],
        queryFn: () =>
          makeRequestToBackend({
            url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs?from=${fromString}&to=${toString}`,
          }),
        enabled: !!isEnabled,
      },
      {
        queryKey: ['eventLogs', user?.uid, user?.journalId, from],
        queryFn: () =>
          makeRequestToBackend({
            url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/report_logs?from=${fromString}&to=${toString}`,
          }),
        enabled: !!isEnabled,
      },
    ],
  });

  return queries;
}

export default useGetAllJournalEvents;
