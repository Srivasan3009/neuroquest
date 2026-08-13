import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadUserData, saveUserData } from '../storage';
import { useAuth } from './AuthContext';

const ProfileContext = createContext(null);

export function useProfile() {
  return useContext(ProfileContext);
}

const EMPTY = {
  profile: null,
  completed: {},
  earnedAchs: {}
};

export function ProfileProvider({ children }) {
  const { session } = useAuth();

  const [data, setData] = useState(() => (session ? loadUserData(session) : EMPTY));

  useEffect(() => {
    if (session) setData(loadUserData(session));
  }, [session]);

  // Reset the daily goal counter when the calendar day changes.
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setData((d) => {
      if (!d.profile) return d;
      if (d.profile.lastDailyReset === today) return d;
      return {
        ...d,
        profile: { ...d.profile, daily_completed: 0, lastDailyReset: today }
      };
    });
  }, []);

  const persistAfter = useCallback(
    (mutator) => {
      setData((d) => {
        const next = mutator(d);
        if (session) saveUserData(session, next);
        return next;
      });
    },
    [session]
  );

  const setProfile = useCallback(
    (updaterOrValue) => {
      persistAfter((d) => ({
        ...d,
        profile:
          typeof updaterOrValue === 'function' ? updaterOrValue(d.profile) : updaterOrValue
      }));
    },
    [persistAfter]
  );

  const setCompleted = useCallback(
    (updaterOrValue) => {
      persistAfter((d) => ({
        ...d,
        completed:
          typeof updaterOrValue === 'function' ? updaterOrValue(d.completed) : updaterOrValue
      }));
    },
    [persistAfter]
  );

  const setEarnedAchs = useCallback(
    (updaterOrValue) => {
      persistAfter((d) => ({
        ...d,
        earnedAchs:
          typeof updaterOrValue === 'function' ? updaterOrValue(d.earnedAchs) : updaterOrValue
      }));
    },
    [persistAfter]
  );

  const value = useMemo(
    () => ({
      profile: data.profile,
      setProfile,
      completed: data.completed,
      setCompleted,
      earnedAchs: data.earnedAchs,
      setEarnedAchs
    }),
    [data, setProfile, setCompleted, setEarnedAchs]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}