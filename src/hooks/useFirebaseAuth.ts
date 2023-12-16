import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function useFirebaseAuth() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName } = user;

        if (!email || !displayName) {
          setUser(null);
          return;
        }

        setUser({ email, username: displayName });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
}

export default useFirebaseAuth;
