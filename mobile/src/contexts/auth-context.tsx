import { createContext, PropsWithChildren } from 'react';

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  async function signIn() {
    console.log('Vamos logar?');
  }

  const user: UserProps = {
    name: 'Marcos Botene',
    avatarUrl: 'https://github.com/marcosjbm.png',
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
