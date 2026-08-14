import { PURPLE_LIGHT } from '../theme';

// Port of the original StatPill component.
export default function StatPill({ icon, value, bg = PURPLE_LIGHT, color = '#A5B4FC' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: bg,
        padding: '6px 12px',
        borderRadius: 20,
        marginRight: 8,
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <span style={{ fontSize: 16, marginRight: 4 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}