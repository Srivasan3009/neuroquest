import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSession, signIn as doSignIn, signUp as doSignUp, signOut as doSignOut } from '../storage';
import { navigate } from '../router';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());
  const [loading, setLoading] = useState(true);

  // Brief splash so the "authLoading" moment from the original is preserved.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const value = useMemo(
    () => ({
      session,
      loading,
      signIn: (email, password) => {
        const result = doSignIn(email, password);
        if (result.ok) {
          setSession(email.trim().toLowerCase());
          navigate('/app');
        }
        return result;
      },
      signUp: (email, password) => {
        const result = doSignUp(email, password);
        if (result.ok) {
          setSession(email.trim().toLowerCase());
          navigate('/app');
        }
        return result;
      },
      signOut: () => {
        doSignOut();
        setSession(null);
        navigate('/signin');
      }
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
