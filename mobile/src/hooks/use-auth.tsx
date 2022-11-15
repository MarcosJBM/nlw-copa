import { useContext } from 'react';

import { AuthContext, AuthContextDataProps } from '../contexts';

export function useAuth(): AuthContextDataProps {
  return useContext(AuthContext);
}
