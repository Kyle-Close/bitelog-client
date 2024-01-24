import { Auth } from 'firebase/auth';
import { FC, createContext, useState, ReactNode } from 'react';
import { fetchDataFromBackend, getUserJournalId } from '../helpers/utility';

export interface ProviderProps {
  children: ReactNode;
}

export interface User {
  username: string;
  email: string;
  uid: string;
  journalId: number | null; // Ensure this is part of the User interface
}

interface IUserContext {
  user: User | null;
  LoginUser: (auth: Auth, user: User) => void;
  ClearUserContext: () => void;
  SetUserJournalId: () => void;
}

const initialUserContext: IUserContext = {
  user: null,
  LoginUser: () => {},
  ClearUserContext: () => {},
  SetUserJournalId: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const LoginUser = async (auth: Auth, newUser: User) => {
    console.log('Token:', await auth.currentUser?.getIdToken());
    // Check that the user has validated their email through firebase
    const isEmailVerified = auth.currentUser?.emailVerified;

    if (isEmailVerified) {
      console.log('Setting user context. Email is verified');
      setUser(newUser);
    } else {
      console.log('Email not verified. Not setting user context');
    }
  };

  const ClearUserContext = () => {
    setUser(null);
  };

  const SetUserJournalId = async () => {
    if (!user) return;
    try {
      const id = await getUserJournalId(user.uid);
      setUser((prevUser) => {
        if (prevUser === null) return null;
        return { ...prevUser, journalId: id };
      });
    } catch (error) {
      console.error('Error fetching journal ID:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, LoginUser, ClearUserContext, SetUserJournalId }}
    >
      {children}
    </UserContext.Provider>
  );
};
