import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ACCENT,
  BG,
  ERROR,
  ERROR_BG,
  PRIMARY_GRAD,
  SUCCESS,
  SUCCESS_BG,
  TEXT1,
  TEXT2
} from '../theme';

// Port of the original SignInScreen. Supabase auth is replaced with
// localStorage accounts (see storage.js).
export default function SignIn() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setAuthError('');
    setInfo('');
    const op = isSignUp ? signUp(email, password) : signIn(email, password);
    if (op.error) {
      setAuthError(op.error);
      setLoading(false);
    } else {
      // AuthContext navigates to #/app on success
      setLoading(false);
    }
  };

  const inputWrap = (borderColor) => ({
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    border: `1px solid ${borderColor}`,
    padding: '0 16px',
    marginBottom: 14,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  });

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(99,102,241,0.30) 0%, rgba(139,92,246,0.16) 60%, rgba(255,255,255,0.04) 100%)',
          paddingTop: 48,
          paddingBottom: 44,
          paddingHorizontal: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.10)'
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
          }}
        >
          <span style={{ fontSize: 42 }}>🧠</span>
        </div>
        <div
          className="font-heading"
          style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 700, marginBottom: 6 }}
        >
          NeuroQuest
        </div>
        <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: 15 }}>
          Learn AI, one lesson at a time
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <div className="content-col" style={{ padding: 24, paddingTop: 32 }}>
          <div
            className="font-heading"
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: TEXT1,
              marginBottom: 24,
              textAlign: 'center'
            }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </div>

          {authError && (
            <div
              style={{
                backgroundColor: ERROR_BG,
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                borderLeft: `3px solid ${ERROR}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <div style={{ color: ERROR, fontSize: 13 }}>{authError}</div>
            </div>
          )}

          {info && (
            <div
              style={{
                backgroundColor: SUCCESS_BG,
                borderRadius: 12,
                padding: 12,
                marginBottom: 16,
                borderLeft: `3px solid ${SUCCESS}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              <div style={{ color: SUCCESS, fontSize: 13 }}>{info}</div>
            </div>
          )}

          <div style={inputWrap(email ? '#A5B4FC' : 'rgba(255,255,255,0.14)')}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              placeholderTextColor={TEXT2}
              style={{ fontSize: 15, color: TEXT1, padding: '14px 0', width: '100%' }}
              autoCapitalize="none"
              autoCorrect="false"
              spellCheck={false}
            />
          </div>

          <div
            style={{
              ...inputWrap(password ? '#A5B4FC' : 'rgba(255,255,255,0.14)'),
              marginBottom: 24
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              placeholder="Password"
              placeholderTextColor={TEXT2}
              style={{ fontSize: 15, color: TEXT1, padding: '14px 0', width: '100%' }}
              autoCapitalize="none"
            />
          </div>

          <button
            type="button"
            className="tappable block"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: PRIMARY_GRAD,
              borderRadius: 16,
              padding: 16,
              textAlign: 'center',
              marginBottom: 16,
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 8px 24px rgba(99,102,241,0.35)'
            }}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800 }}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </span>
            )}
          </button>

          <button
            type="button"
            className="tappable block"
            onClick={() => {
              setIsSignUp((v) => !v);
              setAuthError('');
              setInfo('');
            }}
            style={{ textAlign: 'center', padding: '12px 0' }}
          >
            <span style={{ color: ACCENT, fontSize: 14, fontWeight: 600 }}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
