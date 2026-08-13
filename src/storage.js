// localStorage-backed accounts + profile persistence.
// This replaces Supabase so the app works on a static host with $0 cost.
// NOTE: passwords are lightly hashed for taste — this is NOT production-grade
// security. Accounts live in the browser only. See README for the trade-off.

import { DEFAULT_PROFILE } from './data';

const USERS_KEY = 'nq_users';
const SESSION_KEY = 'nq_session';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — ignore
  }
}

// Small synchronous hash (FNV-1a variant). Demo-grade only.
export function hashPassword(pw) {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  const s = 'neuroquest:' + pw;
  for (let i = 0; i < s.length; i++) {
    h1 ^= s.charCodeAt(i);
    h1 = Math.imul(h1, 16777619) >>> 0;
    h2 ^= s.charCodeAt(i);
    h2 = Math.imul(h2, 31) >>> 0;
  }
  return h1.toString(16) + h2.toString(16);
}

export function getUsers() {
  return read(USERS_KEY, []);
}

function saveUsers(users) {
  write(USERS_KEY, users);
}

export function signIn(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email.trim().toLowerCase());
  if (!user) return { error: 'No account found with this email. Please sign up first.' };
  if (user.password !== hashPassword(password)) return { error: 'Incorrect password. Please try again.' };
  write(SESSION_KEY, user.email);
  return { ok: true };
}

export function signUp(email, password) {
  const normalized = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalized)) return { error: 'Please enter a valid email address.' };
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
  const users = getUsers();
  if (users.some((u) => u.email === normalized)) return { error: 'An account with this email already exists.' };
  users.push({
    email: normalized,
    password: hashPassword(password),
    createdAt: Date.now()
  });
  saveUsers(users);
  write(SESSION_KEY, normalized);
  return { ok: true };
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function getSession() {
  return read(SESSION_KEY, null);
}

function dataKey(email) {
  return 'nq_data_' + email;
}

export function loadUserData(email) {
  const stored = read(dataKey(email), null);
  const profile = Object.assign({}, DEFAULT_PROFILE, stored ? stored.profile : {});
  if (!profile.username || profile.username === 'NeuroLearner') {
    profile.username = (email.split('@')[0] || 'NeuroLearner').replace(/[^a-zA-Z0-9_]/g, '') || 'NeuroLearner';
  }
  return {
    profile,
    completed: (stored && stored.completed) || {},
    earnedAchs: (stored && stored.earnedAchs) || {}
  };
}

export function saveUserData(email, data) {
  write(dataKey(email), data);
}