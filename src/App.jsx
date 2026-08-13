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
import { PRIMARY } from './theme';

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
        backgroundColor: PRIMARY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 20 }}>🧠</div>
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