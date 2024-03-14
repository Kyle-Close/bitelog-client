import { useContext } from 'react';
import { UserContext } from '../context';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../config/axiosConfig';

const fetchUserJournal = async (userId: string | undefined) => {
  const url = BASE_URL + `/user/${userId}/journal`;
  const res = await fetch(url);
  return await res.json();
};

function useFetchJournal() {
  const { user } = useContext(UserContext);
  const { data, error, isLoading } = useQuery({
    queryKey: ['journal', user],
    queryFn: () => fetchUserJournal(user?.uid),
    enabled: !!user,
  });

  return { data, error, isLoading };
}
