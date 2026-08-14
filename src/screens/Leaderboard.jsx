import { useProfile } from '../context/ProfileContext';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  BG,
  GOLD,
  PURPLE_LIGHT,
  TEXT1,
  TEXT2,
  WEB_TAB_MENU_PADDING,
  headerGlass,
  softCard
} from '../theme';
import { MOCK_LEADERBOARD } from '../data';

// Port of the original LeaderboardScreen.
export default function Leaderboard() {
  const { profile } = useProfile();
  const meEntry = {
    rank: profile.user_rank || 11,
    name: profile.username,
    avatar: profile.avatar_emoji,
    weeklyXP: profile.weekly_xp,
    level: profile.level,
    isMe: true
  };
  const medalColors = ['#F5CF6E', '#D8DEE9', '#D9A441'];

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AnimatedBackground />
      <div style={{ ...headerGlass, paddingTop: 8, paddingBottom: 20, paddingHorizontal: 20, position: 'relative', zIndex: 10 }}>
        <div
          className="font-heading"
          style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 700, marginBottom: 4 }}
        >
          🏆 Leaderboard
        </div>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>
          Weekly XP Rankings
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, zIndex: 5, minHeight: 0 }}>
        <div className="content-col" style={{ paddingTop: 16, paddingBottom: WEB_TAB_MENU_PADDING, paddingHorizontal: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
            {[1, 0, 2].map((ri) => {
              const user = MOCK_LEADERBOARD[ri];
              const isTop = ri === 0;
              return (
                <div key={String(ri)} style={{ textAlign: 'center', flex: 1 }}>
                  {ri === 0 && <div style={{ fontSize: 20, marginBottom: 4 }}>👑</div>}
                  <div
                    style={{
                      width: isTop ? 64 : 52,
                      height: isTop ? 64 : 52,
                      borderRadius: isTop ? 32 : 26,
                      backgroundColor: medalColors[ri],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 6px',
                      boxShadow: `0 4px 10px ${medalColors[ri]}`
                    }}
                  >
                    <span style={{ fontSize: isTop ? 28 : 22 }}>{user.avatar}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT1 }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: TEXT2 }}>{user.weeklyXP} XP</div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              ...softCard,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(232,179,75,0.35)',
              boxShadow: '0 8px 28px rgba(232,179,75,0.12), inset 0 1px 0 rgba(255,255,255,0.10)'
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #F5CF6E 0%, #D9A441 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(232,179,75,0.4)'
              }}
            >
              <span style={{ color: '#1A160B', fontSize: 13, fontWeight: 800 }}>#{meEntry.rank}</span>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: PURPLE_LIGHT,
                border: '1px solid rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                flexShrink: 0
              }}
            >
              <span style={{ fontSize: 18 }}>{meEntry.avatar}</span>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: TEXT1 }}>{meEntry.name}</span>
                <span
                  style={{
                    marginLeft: 8,
                    background: 'linear-gradient(135deg, #F5CF6E 0%, #D9A441 100%)',
                    padding: '2px 6px',
                    borderRadius: 6
                  }}
                >
                  <span style={{ color: '#1A160B', fontSize: 9, fontWeight: 700 }}>YOU</span>
                </span>
              </div>
              <div style={{ fontSize: 12, color: TEXT2 }}>Level {meEntry.level}</div>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: GOLD }}>
              {meEntry.weeklyXP} XP
            </span>
          </div>

          {MOCK_LEADERBOARD.map((user, idx) => {
            const medal = idx < 3 ? medalColors[idx] : null;
            return (
              <div
                key={String(idx)}
                style={{
                  ...softCard,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: medal ? medal + '26' : PURPLE_LIGHT,
                    border: medal ? '1px solid ' + medal + '55' : '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    flexShrink: 0
                  }}
                >
                  {medal ? (
                    <span style={{ fontSize: 16 }}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 800, color: TEXT2 }}>#{user.rank}</span>
                  )}
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: user.avatar === '🧠' ? PURPLE_LIGHT : 'rgba(232,179,75,0.14)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: 18 }}>{user.avatar}</span>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TEXT1 }}>{user.name}</div>
                  <div style={{ fontSize: 12, color: TEXT2 }}>Level {user.level}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    className="font-heading"
                    style={{ fontSize: 17, fontWeight: 700, color: '#F5CF6E' }}
                  >
                    {user.weeklyXP}
                  </div>
                  <div style={{ fontSize: 10, color: TEXT2 }}>XP this week</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}