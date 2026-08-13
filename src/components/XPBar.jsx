import { BORDER } from '../theme';

// Port of the original XPBar component.
export default function XPBar({ progress, color, height = 8, width = '100%' }) {
  const p = Math.max(0, Math.min(1, progress || 0));
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: BORDER,
        borderRadius: height / 2,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: p * 100 + '%',
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2
        }}
      />
    </div>
  );
}