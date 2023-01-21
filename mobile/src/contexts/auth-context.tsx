import { CLIENT_ID } from '@env';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { api } from '../services';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(accessToken: string) {
    try {
      setIsUserLoading(true);

      const { data } = await api.post('/users', {
        access_token: accessToken,
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      const userResponse = await api.get('/me');

      setUser(userResponse.data.user);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
