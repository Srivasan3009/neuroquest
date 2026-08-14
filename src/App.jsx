import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { useHashRoute, navigate } from './router';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Learn from './screens/Learn';
import Leaderboard from './screens/Leaderboard';
import Tutor from './screens/Tutor';
import Profile from './screens/Profile';
import Lesson from './screens/Lesson';
import LessonComplete from './screens/LessonComplete';
import BottomTabBar from './components/BottomTabBar';

// Port of RootNavigator + MainNavigator + TabNavigator.
function MainApp() {
  const [tab, setTab] = useState('home');

  const goTab = (key) => {
    setTab(key);
    navigate('/app');
  };
  const openLesson = (lessonId) => navigate('/lesson/' + lessonId);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {tab === 'home' && <Home goTab={goTab} openLesson={openLesson} />}
        {tab === 'learn' && <Learn openLesson={openLesson} />}
        {tab === 'leaderboard' && <Leaderboard />}
        {tab === 'tutor' && <Tutor />}
        {tab === 'profile' && <Profile />}
      </div>
      <BottomTabBar active={tab} onChange={goTab} />
    </div>
  );
}

function Splash() {
  return (
    <div
      style={{
        flex: 1,
        background: '#0B0F1F',
        backgroundImage:
          'radial-gradient(600px 400px at 30% 20%, rgba(99,102,241,0.5), transparent 60%), radial-gradient(500px 400px at 75% 75%, rgba(232,179,75,0.25), transparent 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
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
          marginBottom: 20,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
        }}
      >
        <span style={{ fontSize: 40 }}>🧠</span>
      </div>
      <span className="spinner spinner-large" />
    </div>
  );
}

function Root() {
  const { session, loading } = useAuth();
  const route = useHashRoute();

  if (loading) return <Splash />;

  if (!session) return <SignIn />;

  return (
    <ProfileProvider>
      <AuthedRoutes route={route} />
    </ProfileProvider>
  );
}

function AuthedRoutes({ route }) {
  const [top, id] = route.parts;
  if (top === 'lesson') return <Lesson lessonId={id || 'l-001'} />;
  if (top === 'complete') return <LessonComplete params={route.params} />;
  return <MainApp />;
}

export default function App() {
  return (
    <div className="app-frame">
      <div className="frame-root">
        <AuthProvider>
          <Root />
        </AuthProvider>
      </div>
    </div>
  );
}