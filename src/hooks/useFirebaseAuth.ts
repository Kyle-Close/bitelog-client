import { useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function useFirebaseAuth() {
  const { ClearUserContext, LoginUser } = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid } = user;

        if (!email || !displayName) {
          ClearUserContext();
          return;
        }

        LoginUser(auth, { email, username: displayName, uid, journalId: null });
      } else {
        ClearUserContext();
      }
    });

    return () => unsubscribe();
  }, []);
}

export default useFirebaseAuth;
