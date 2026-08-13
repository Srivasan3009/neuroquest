// Port of the original AnimatedBackground. The RN Animated.loop is replaced
// with lightweight CSS keyframes (see styles.css) — much cheaper on the web.
export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="blob blob-primary" />
      <div className="blob blob-accent" />
      <div className="blob blob-purple" />
    </div>
  );
}