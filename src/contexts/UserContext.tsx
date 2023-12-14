import { FC, createContext, useState, ReactNode } from 'react';

export interface ProviderProps {
  children: ReactNode;
}

interface User {
  username: string;
  email: string;
}

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialUserContext: IUserContext = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // TO-DO
  // Create function that sets all the fields on user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
