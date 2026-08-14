// Port of the original XPBar component.
export default function XPBar({ progress, color, height = 8, width = '100%' }) {
  const p = Math.max(0, Math.min(1, progress || 0));
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderRadius: height / 2,
        overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{
          width: p * 100 + '%',
          height: '100%',
          background: color,
          borderRadius: height / 2,
          boxShadow: '0 0 10px rgba(255,255,255,0.25)'
        }}
      />
    </div>
  );
}