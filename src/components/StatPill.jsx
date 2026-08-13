import { PURPLE_LIGHT, PRIMARY } from '../theme';

// Port of the original StatPill component.
export default function StatPill({ icon, value, bg = PURPLE_LIGHT, color = PRIMARY }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: bg,
        padding: '6px 12px',
        borderRadius: 20,
        marginRight: 8
      }}
    >
      <span style={{ fontSize: 16, marginRight: 4 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}