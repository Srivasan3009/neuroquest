import { useProfile } from '../context/ProfileContext';
import StatPill from '../components/StatPill';
import XPBar from '../components/XPBar';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  ACCENT,
  BG,
  GOLD,
  GOLD_GRAD,
  PRIMARY_GRAD,
  TEXT1,
  TEXT2,
  WEB_TAB_MENU_PADDING,
  headerGlass,
  glassCard
} from '../theme';
import { ALL_LESSONS_FLAT, DAILY_CHALLENGES } from '../data';

// Port of the original HomeScreen.
export default function Home({ goTab, openLesson }) {
  const { profile, completed } = useProfile();

  const completedIds = Object.keys(completed).filter((k) => completed[k]);
  let nextLesson = null;
  for (let i = 0; i < ALL_LESSONS_FLAT.length; i++) {
    if (!completed[ALL_LESSONS_FLAT[i].id]) {
      nextLesson = ALL_LESSONS_FLAT[i];
      break;
    }
  }

  const xpForNextLevel = profile.level * 200;
  const xpProgress = Math.min((profile.total_xp % xpForNextLevel) / xpForNextLevel, 1);
  const dailyProgress = Math.min(profile.daily_completed / profile.daily_goal, 1);
  const scrollPad = WEB_TAB_MENU_PADDING;

  if (!profile) return null;

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AnimatedBackground />

      <div
        style={{
          ...headerGlass,
          paddingTop: 8,
          paddingBottom: 20,
          paddingHorizontal: 20,
          position: 'relative',
          zIndex: 10
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500 }}>
              Welcome back!
            </div>
            <div
              className="font-heading"
              style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700 }}
            >
              {profile.username}
            </div>
          </div>
          <button type="button" className="tappable" onClick={() => goTab('profile')}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="avatar"
                  style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: 22 }}>{profile.avatar_emoji}</span>
              )}
            </div>
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatPill
            icon="🔥"
            value={profile.current_streak}
            bg="rgba(255,255,255,0.10)"
            color="#FDE68A"
          />
          <StatPill icon="⭐" value={profile.total_xp} bg="rgba(255,255,255,0.10)" color="#FDE68A" />
          <StatPill
            icon="❤️"
            value={profile.energy + '/' + profile.max_energy}
            bg="rgba(255,255,255,0.10)"
            color="#FCA5A5"
          />
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, zIndex: 5, minHeight: 0 }}>
        <div className="content-col" style={{ paddingTop: 16, paddingBottom: scrollPad, paddingHorizontal: 16 }}>
          <div style={{ ...glassCard, marginBottom: 16, boxShadow: '0 8px 32px rgba(99,102,241,0.30), inset 0 1px 0 rgba(255,255,255,0.10)' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}
            >
              <span className="font-heading" style={{ fontSize: 16, fontWeight: 700, color: TEXT1 }}>
                📊 Level {profile.level}
              </span>
              <span style={{ fontSize: 12, color: TEXT2 }}>
                {profile.total_xp} / {profile.level * 200} XP
              </span>
            </div>
            <XPBar progress={xpProgress} color={PRIMARY_GRAD} height={10} />
          </div>

          <div style={{ ...glassCard, marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12
              }}
            >
              <span className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: TEXT1 }}>
                🎯 Daily Goal
              </span>
              <span style={{ fontSize: 13, color: GOLD, fontWeight: 600 }}>
                {profile.daily_completed}/{profile.daily_goal} lessons
              </span>
            </div>
            <XPBar progress={dailyProgress} color={ACCENT} height={12} />
            <div style={{ fontSize: 12, color: TEXT2, marginTop: 6 }}>
              {dailyProgress >= 1
                ? '🎉 Daily goal complete! Amazing!'
                : 'Keep going to reach your daily goal!'}
            </div>
          </div>

          {nextLesson && (
            <button
              type="button"
              className="tappable block"
              onClick={() => openLesson(nextLesson.id)}
              style={{ borderRadius: 22, marginBottom: 16, overflow: 'hidden' }}
            >
              <div
                style={{
                  background: PRIMARY_GRAD,
                  padding: 20,
                  boxShadow: '0 12px 36px rgba(99,102,241,0.40), inset 0 1px 0 rgba(255,255,255,0.15)'
                }}
              >
                <div
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 4,
                    textAlign: 'left'
                  }}
                >
                  📚 {nextLesson.courseTitle} • {nextLesson.unitTitle}
                </div>
                <div
                  className="font-heading"
                  style={{
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 12,
                    textAlign: 'left'
                  }}
                >
                  {nextLesson.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ color: '#FDE68A', fontSize: 13, fontWeight: 600 }}>
                    +{nextLesson.xp} XP reward
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.20)'
                    }}
                  >
                    <span style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700, marginRight: 4 }}>
                      Continue
                    </span>
                    <span style={{ color: '#FFFFFF', fontSize: 14 }}>→</span>
                  </span>
                </div>
              </div>
            </button>
          )}

          <div
            className="font-heading"
            style={{ fontSize: 20, fontWeight: 700, color: TEXT1, marginBottom: 12 }}
          >
            🏆 Daily Challenges
          </div>
          {DAILY_CHALLENGES.map((ch, idx) => (
            <div
              key={ch.id}
              style={{
                ...glassCard,
                borderRadius: 18,
                padding: 14,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: 'rgba(129,140,248,0.20)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}
              >
                <span style={{ fontSize: 22 }}>{ch.icon}</span>
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT1 }}>{ch.title}</div>
                <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{ch.description}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>+{ch.xp}</div>
                <div style={{ fontSize: 10, color: TEXT2 }}>XP</div>
              </div>
            </div>
          ))}

          <div
            className="font-heading"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: TEXT1,
              marginBottom: 12,
              marginTop: 8
            }}
          >
            📈 Your Stats
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {[
              { icon: '📚', label: 'Lessons', value: String(completedIds.length) },
              { icon: '🔥', label: 'Streak', value: profile.current_streak + ' days' },
              { icon: '⭐', label: 'Total XP', value: String(profile.total_xp) },
              { icon: '📊', label: 'Level', value: String(profile.level) }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  width: '48%',
                  ...glassCard,
                  borderRadius: 18,
                  padding: 16,
                  marginBottom: 10,
                  marginRight: i % 2 === 0 ? '4%' : 0,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{stat.icon}</div>
                <div
                  className="font-heading"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    background: GOLD_GRAD,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}