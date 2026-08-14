import { goHome } from '../router';
import { LESSONS_BY_ID } from '../data';

function bool(v) {
  return v === 'true' || v === true;
}

// Port of the original LessonCompleteScreen.
export default function LessonComplete({ params = {} }) {
  const lessonId = params.lessonId || 'l-001';
  const xpEarned = parseInt(params.xpEarned, 10) || 20;
  const isPerfect = bool(params.isPerfect);
  const correctCount = parseInt(params.correctCount, 10) || 0;
  const totalQuestions = parseInt(params.totalQuestions, 10) || 0;
  const lesson = LESSONS_BY_ID[lessonId] || { title: 'Lesson', courseColor: '#6366F1' };
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const courseColor = lesson.courseColor || '#6366F1';

  return (
    <div
      style={{
        flex: 1,
        background: `radial-gradient(120% 90% at 50% 0%, ${courseColor}55 0%, rgba(11,15,31,0.2) 55%, rgba(11,15,31,0.85) 100%)`,
        backgroundColor: '#0B0F1F',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}
    >
      <div className="scroll" style={{ flex: 1 }}>
        <div
          style={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            paddingTop: 40,
            maxWidth: 560,
            width: '100%',
            margin: '0 auto'
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 16, textAlign: 'center' }}>
            {isPerfect ? '🏆' : '🎉'}
          </div>
          <div
            className="font-heading"
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: 8
            }}
          >
            Lesson Complete!
          </div>
          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              marginBottom: 32
            }}
          >
            {lesson.title}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: 24,
              width: '100%',
              marginBottom: 24,
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 20,
                alignItems: 'center'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  className="font-heading"
                  style={{ fontSize: 34, fontWeight: 700, color: '#F5CF6E' }}
                >
                  +{xpEarned}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>XP Earned</div>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'center' }}>
                <div className="font-heading" style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF' }}>
                  {accuracy}%
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Accuracy</div>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'center' }}>
                <div className="font-heading" style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF' }}>
                  {correctCount}/{totalQuestions}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Correct</div>
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 8 }}>
              Progress
            </div>
            <div
              style={{
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: 5,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: accuracy + '%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #F5CF6E 0%, #E8B34B 100%)',
                  borderRadius: 5,
                  boxShadow: '0 0 12px rgba(232,179,75,0.6)'
                }}
              />
            </div>
          </div>

          {isPerfect && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(245,207,110,0.20) 0%, rgba(232,179,75,0.10) 100%)',
                borderRadius: 16,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: 16,
                border: '1px solid rgba(232,179,75,0.35)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <span style={{ fontSize: 22, marginRight: 10 }}>⭐</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#F5CF6E' }}>
                  Perfect Score!
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                  Bonus +10 XP for perfection!
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            className="tappable"
            onClick={goHome}
            style={{
              background: 'linear-gradient(135deg, #F5CF6E 0%, #D9A441 100%)',
              borderRadius: 16,
              padding: '16px 32px',
              width: '100%',
              textAlign: 'center',
              marginBottom: 12,
              boxShadow: '0 12px 36px rgba(232,179,75,0.35)'
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: '#1A160B' }}>
              Continue Learning →
            </span>
          </button>

          <button
            type="button"
            className="tappable"
            onClick={() => goHome()}
            style={{ padding: '12px 0', textAlign: 'center' }}
          >
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
              Back to Learning Path
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}