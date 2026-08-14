import { goHome } from '../router';
import { LESSONS_BY_ID } from '../data';
import { PRIMARY } from '../theme';

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
  const lesson = LESSONS_BY_ID[lessonId] || { title: 'Lesson', courseColor: PRIMARY };
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: lesson.courseColor || PRIMARY,
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
            style={{
              fontSize: 32,
              fontWeight: 900,
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
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              marginBottom: 32
            }}
          >
            {lesson.title}
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 20,
              padding: 24,
              width: '100%',
              marginBottom: 24
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
                <div style={{ fontSize: 32, fontWeight: 900, color: '#FDE68A' }}>+{xpEarned}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>XP Earned</div>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>{accuracy}%</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Accuracy</div>
              </div>
              <div style={{ width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>
                  {correctCount}/{totalQuestions}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Correct</div>
              </div>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 }}>
              Progress
            </div>
            <div
              style={{
                height: 10,
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 5,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: accuracy + '%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 5
                }}
              />
            </div>
          </div>

          {isPerfect && (
            <div
              style={{
                backgroundColor: '#FDE68A',
                borderRadius: 14,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: 16
              }}
            >
              <span style={{ fontSize: 22, marginRight: 10 }}>⭐</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#92400E' }}>
                  Perfect Score!
                </div>
                <div style={{ fontSize: 12, color: '#78350F' }}>
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
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              padding: '16px 32px',
              width: '100%',
              textAlign: 'center',
              marginBottom: 12
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: lesson.courseColor || PRIMARY }}>
              Continue Learning →
            </span>
          </button>

          <button
            type="button"
            className="tappable"
            onClick={() => goHome()}
            style={{ padding: '12px 0', textAlign: 'center' }}
          >
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
              Back to Learning Path
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}