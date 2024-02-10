import { useQueries } from '@tanstack/react-query';
import { User } from '../contexts';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';

function useGetAllJournalEvents(user?: User | null) {
  if (!user || !user.journalId) return [];
  const queries = useQueries({
    queries: [
      {
        queryKey: ['eatLogs', user.uid, user.journalId],
        queryFn: () =>
          makeRequestToBackend({
            url:
              BASE_URL + `/user/${user.uid}/journal/${user.journalId}/eat_logs`,
          }),
      },
      {
        queryKey: ['eventLogs', user.uid, user.journalId],
        queryFn: () =>
          makeRequestToBackend({
            url:
              BASE_URL +
              `/user/${user.uid}/journal/${user.journalId}/report_logs?time=24`,
          }),
      },
    ],
  });

  return queries;
}

function isEnabledQuery(user?: User | null) {
  if (user && user.journalId) return true;
  else return false;
}

export default useGetAllJournalEvents;
