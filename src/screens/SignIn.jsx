import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BG, BORDER, CARD, ERROR, PRIMARY, SUCCESS, TEXT1, TEXT2 } from '../theme';

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
    backgroundColor: CARD,
    borderRadius: 14,
    border: `1.5px solid ${borderColor}`,
    padding: '0 16px',
    marginBottom: 14
  });

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          backgroundColor: PRIMARY,
          paddingTop: 40,
          paddingBottom: 40,
          paddingHorizontal: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 12 }}>🧠</div>
        <div style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
          NeuroQuest
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>
          Learn AI, one lesson at a time
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <div className="content-col" style={{ padding: 24, paddingTop: 32 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
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
                backgroundColor: '#FEF2F2',
                borderRadius: 10,
                padding: 12,
                marginBottom: 16,
                borderLeft: `3px solid ${ERROR}`
              }}
            >
              <div style={{ color: ERROR, fontSize: 13 }}>{authError}</div>
            </div>
          )}

          {info && (
            <div
              style={{
                backgroundColor: '#ECFDF5',
                borderRadius: 10,
                padding: 12,
                marginBottom: 16,
                borderLeft: `3px solid ${SUCCESS}`
              }}
            >
              <div style={{ color: SUCCESS, fontSize: 13 }}>{info}</div>
            </div>
          )}

          <div style={inputWrap(email ? PRIMARY : BORDER)}>
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

          <div style={{ ...inputWrap(password ? PRIMARY : BORDER), marginBottom: 24 }}>
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
              backgroundColor: loading ? BORDER : PRIMARY,
              borderRadius: 14,
              padding: 16,
              textAlign: 'center',
              marginBottom: 16,
              opacity: loading ? 0.8 : 1
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
            <span style={{ color: PRIMARY, fontSize: 14, fontWeight: 600 }}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
