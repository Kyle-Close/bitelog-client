import { Auth } from 'firebase/auth';
import { FC, createContext, useState, ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

export interface User {
  username: string;
  email: string;
  uid: string;
}

interface IUserContext {
  user: User | null;
  LoginUser: (auth: Auth, user: User) => void;
  ClearUserContext: () => void;
}

const initialUserContext: IUserContext = {
  user: null,
  LoginUser: () => {},
  ClearUserContext: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const LoginUser = async (auth: Auth, user: User) => {
    console.log('Token:', await auth.currentUser?.getIdToken());
    // Check that the user has validated their email through firebase
    const isEmailVerified = auth.currentUser?.emailVerified;
    if (isEmailVerified) {
      console.log('Setting user context. Email is verified');
      setUser(user);
    } else {
      console.log('Email not verified. Not setting user context');
    }
  };

  const ClearUserContext = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, LoginUser, ClearUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
