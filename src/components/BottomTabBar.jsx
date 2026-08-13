import { PRIMARY, TEXT2 } from '../theme';

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
            style={{ color: focused ? PRIMARY : TEXT2 }}
          >
            <span style={{ fontSize: 20 }}>{focused ? tab.active : tab.inactive}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: focused ? 700 : 500,
                color: focused ? PRIMARY : TEXT2
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