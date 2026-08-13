// Tiny hash-based router (refresh-safe on static hosts, no server config).
// Routes:
//   #/app                    → main tabs (default tab is Home)
//   #/lesson/l-001           → lesson quiz
//   #/complete?lessonId=..   → lesson complete screen
//   (anything else / none)   → SignIn (when signed out) or app

import { useEffect, useState } from 'react';

function parseHash() {
  if (typeof window === 'undefined') return { parts: [], params: {} };
  const h = window.location.hash.replace(/^#\/?/, '');
  const qIndex = h.indexOf('?');
  const path = qIndex === -1 ? h : h.slice(0, qIndex);
  const query = qIndex === -1 ? '' : h.slice(qIndex + 1);
  const parts = path.split('/').filter(Boolean);
  const params = {};
  query.split('&').forEach((pair) => {
    if (!pair) return;
    const eq = pair.indexOf('=');
    const k = eq === -1 ? pair : pair.slice(0, eq);
    const v = eq === -1 ? '' : pair.slice(eq + 1);
    params[decodeURIComponent(k)] = decodeURIComponent(v.replace(/\+/g, ' '));
  });
  return { parts, params };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function navigate(to) {
  if (!to.startsWith('#')) to = '#' + to;
  window.location.hash = to;
}

export function goHome() {
  navigate('/app');
}