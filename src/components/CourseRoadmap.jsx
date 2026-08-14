import { useState } from 'react';
import { GLASS_BORDER, SUCCESS, TEXT1, TEXT2 } from '../theme';

// Port of the original CourseRoadmap component.
export default function CourseRoadmap({ course, completed, onLessonPress }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const allLessons = [];
  course.units.forEach((u) => {
    u.lessons.forEach((l) => {
      allLessons.push(Object.assign({}, l, { unitId: u.id, unitTitle: u.title }));
    });
  });

  const completedCount = allLessons.filter((l) => completed[l.id]).length;
  const progress = allLessons.length > 0 ? completedCount / allLessons.length : 0;

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        type="button"
        className="tappable block"
        onClick={() => setIsExpanded((v) => !v)}
        style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 22,
          border: `1px solid ${GLASS_BORDER}`,
          padding: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: course.color + '30',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginRight: 12,
              border: '1px solid rgba(255,255,255,0.10)'
            }}
          >
            <span style={{ fontSize: 26 }}>{course.locked ? '🔒' : course.icon}</span>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: course.locked ? TEXT2 : TEXT1 }}>
              {course.title}
            </div>
            <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>
              {completedCount}/{allLessons.length} lessons
            </div>
          </div>
          <span style={{ fontSize: 18, color: TEXT2 }}>{isExpanded ? '▲' : '▼'}</span>
        </div>
        <div
          style={{
            height: 8,
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          <div
            style={{
              width: progress * 100 + '%',
              height: '100%',
              background: course.color,
              borderRadius: 4,
              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: TEXT2, marginTop: 6 }}>
          {Math.round(progress * 100)}% complete
        </div>
      </button>

      {isExpanded &&
        !course.locked &&
        allLessons.map((lesson, idx) => {
          const isDone = completed[lesson.id];
          const isLocked = idx > 0 && !completed[allLessons[idx - 1].id];
          const showUnitHeader = idx === 0 || allLessons[idx - 1].unitId !== lesson.unitId;
          return (
            <div key={lesson.id} style={{ marginBottom: 10, marginTop: 12 }}>
              {showUnitHeader && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: course.color,
                    marginBottom: 8,
                    marginTop: idx > 0 ? 8 : 0
                  }}
                >
                  {lesson.unitTitle}
                </div>
              )}
              <button
                type="button"
                className="tappable"
                disabled={isLocked || isDone}
                onClick={() => {
                  if (!isLocked && !isDone) onLessonPress(lesson.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: isDone
                    ? course.color + '22'
                    : isLocked
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: 12,
                  border: `1px solid ${
                    isDone
                      ? course.color + '45'
                      : isLocked
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(255,255,255,0.12)'
                  }`,
                  opacity: isLocked ? 0.55 : 1,
                  width: '100%',
                  textAlign: 'left',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: isDone
                      ? SUCCESS + '22'
                      : isLocked
                        ? 'rgba(255,255,255,0.06)'
                        : course.color + '22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}
                >
                  <span style={{ fontSize: 14 }}>{isDone ? '✅' : isLocked ? '🔒' : '📗'}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isDone ? SUCCESS : isLocked ? TEXT2 : TEXT1
                    }}
                  >
                    {lesson.title}
                  </div>
                  <div style={{ fontSize: 11, color: TEXT2 }}>+{lesson.xp} XP</div>
                </div>
                {isDone && (
                  <span style={{ fontSize: 11, color: SUCCESS, fontWeight: 700 }}>Done</span>
                )}
              </button>
            </div>
          );
        })}
    </div>
  );
}