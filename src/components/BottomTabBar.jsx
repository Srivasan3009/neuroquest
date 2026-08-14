import { GOLD, TEXT2 } from '../theme';

const TABS = [
  { key: 'home', label: 'Home', active: '🏠', inactive: '🏡' },
  { key: 'learn', label: 'Learn', active: '📚', inactive: '📚' },
  { key: 'leaderboard', label: 'Ranks', active: '🏆', inactive: '🏆' },
  { key: 'tutor', label: 'AI Tutor', active: '🤖', inactive: '🤖' },
  { key: 'profile', label: 'Profile', active: '👤', inactive: '👤' }
];

// Port of the original TabNavigator bar (absolute, bottom-anchored).
export default function BottomTabBar({ active, onChange }) {
  return (
    <div className="tab-bar">
      {TABS.map((tab) => {
        const focused = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            className="tappable tab-item"
            onClick={() => onChange(tab.key)}
            style={{ color: focused ? GOLD : TEXT2 }}
          >
            <span
              style={{
                fontSize: 20,
                opacity: focused ? 1 : 0.7,
                filter: focused ? 'drop-shadow(0 0 8px rgba(232,179,75,0.5))' : 'none'
              }}
            >
              {focused ? tab.active : tab.inactive}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: focused ? 700 : 500,
                color: focused ? GOLD : TEXT2,
                letterSpacing: 0.2
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}