import { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { navigate } from '../router';
import {
  BORDER,
  CARD,
  ERROR,
  PRIMARY,
  PURPLE_LIGHT,
  SUCCESS,
  TEXT1,
  TEXT2,
  BG
} from '../theme';
import { DEFAULT_QUESTIONS, LESSONS_BY_ID, QUESTIONS_BY_LESSON } from '../data';

// Shared answer/feedback state logic (port of useLessonState).
function useLessonState(lessonId) {
  const lesson = LESSONS_BY_ID[lessonId] || {
    id: lessonId,
    title: 'Lesson',
    xp: 20,
    courseColor: PRIMARY
  };
  const questions = QUESTIONS_BY_LESSON[lessonId] || DEFAULT_QUESTIONS;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [fillText, setFillText] = useState('');

  return {
    lesson,
    questions,
    currentStep,
    setCurrentStep,
    selectedAnswer,
    setSelectedAnswer,
    feedback,
    setFeedback,
    correctCount,
    setCorrectCount,
    fillText,
    setFillText
  };
}

// Port of the original LessonScreen.
export default function Lesson({ lessonId = 'l-001' }) {
  const state = useLessonState(lessonId);
  const { profile, setProfile, setCompleted } = useProfile();

  const currentQ = state.questions[state.currentStep];
  const progress = state.currentStep / state.questions.length;
  const courseColor = state.lesson.courseColor || PRIMARY;

  const handleAnswer = (answer, isCorrect) => {
    state.setSelectedAnswer(answer);
    state.setFeedback({ correct: isCorrect, explanation: currentQ.explanation });
    if (isCorrect) state.setCorrectCount((prev) => prev + 1);
  };

  const handleNext = () => {
    if (state.currentStep < state.questions.length - 1) {
      state.setCurrentStep((prev) => prev + 1);
      state.setSelectedAnswer(null);
      state.setFeedback(null);
      state.setFillText('');
    } else {
      const isPerfect =
        state.correctCount + (state.feedback && state.feedback.correct ? 1 : 0) ===
        state.questions.length;
      const xpEarned = state.lesson.xp + (isPerfect ? 10 : 0);
      const today = new Date().toISOString().split('T')[0];
      const newStreak =
        profile.last_lesson_date === today
          ? profile.current_streak
          : profile.last_lesson_date
            ? (new Date(today) - new Date(profile.last_lesson_date)) / 86400000 <= 1
              ? profile.current_streak + 1
              : 1
            : 1;
      const newXP = profile.total_xp + xpEarned;
      const newLevel = Math.floor(newXP / 200) + 1;
      const newDailyCompleted = profile.daily_completed + 1;
      const newPerfect = profile.perfect_lessons + (isPerfect ? 1 : 0);

      setProfile((prev) =>
        Object.assign({}, prev, {
          total_xp: newXP,
          weekly_xp: prev.weekly_xp + xpEarned,
          level: newLevel,
          current_streak: newStreak,
          longest_streak: Math.max(prev.longest_streak, newStreak),
          lessons_completed: prev.lessons_completed + 1,
          last_lesson_date: today,
          daily_completed: newDailyCompleted,
          perfect_lessons: newPerfect
        })
      );
      setCompleted((prev) => {
        const next = Object.assign({}, prev);
        next[lessonId] = true;
        return next;
      });

      const correctCount =
        state.correctCount + (state.feedback && state.feedback.correct ? 1 : 0);
      navigate(
        '/complete?lessonId=' +
          lessonId +
          '&xpEarned=' +
          xpEarned +
          '&isPerfect=' +
          isPerfect +
          '&correctCount=' +
          correctCount +
          '&totalQuestions=' +
          state.questions.length
      );
    }
  };

  const handleFillSubmit = () => {
    if (!state.fillText.trim()) return;
    const isCorrect =
      state.fillText.trim().toLowerCase() === currentQ.answer.toLowerCase();
    handleAnswer(state.fillText.trim(), isCorrect);
  };

  const typeLabel =
    currentQ.type === 'multiple_choice'
      ? '🔵 Multiple Choice'
      : currentQ.type === 'true_false'
        ? '🟢 True or False'
        : currentQ.type === 'fill_blank'
          ? '✏️ Fill in the Blank'
          : '❓ Question';

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: BG,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}
    >
      <div
        style={{
          backgroundColor: courseColor,
          paddingTop: 8,
          paddingBottom: 12,
          paddingHorizontal: 16
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <button
            type="button"
            className="tappable"
            onClick={() => navigate('/app')}
            style={{ marginRight: 12, padding: 4 }}
          >
            <span style={{ fontSize: 22, color: '#FFFFFF' }}>✕</span>
          </button>
          <div
            style={{
              flex: 1,
              height: 8,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 4,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: progress * 100 + '%',
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: 4
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
            <span style={{ fontSize: 14 }}>❤️</span>
            <span
              style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, marginLeft: 2 }}
            >
              {String(profile.energy)}
            </span>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600 }}>
          {state.lesson.title} • Question {state.currentStep + 1} of {state.questions.length}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <div className="scroll" style={{ height: '100%' }}>
          <div className="content-col" style={{ padding: 20, paddingBottom: 140 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ backgroundColor: courseColor + '15', borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: courseColor,
                    marginBottom: 6,
                    textTransform: 'uppercase',
                    textAlign: 'left'
                  }}
                >
                  {typeLabel}
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: TEXT1, lineHeight: 1.45, textAlign: 'left' }}
                >
                  {currentQ.text}
                </div>
              </div>

              {currentQ.type === 'multiple_choice' &&
                currentQ.options.map((opt, oi) => {
                  const isSelected = state.selectedAnswer === oi;
                  const isCorrect = oi === currentQ.correct;
                  const showResult = state.feedback !== null;
                  let bgColor = CARD;
                  let borderColor = BORDER;
                  let textColor = TEXT1;
                  if (showResult && isCorrect) {
                    bgColor = '#ECFDF5';
                    borderColor = SUCCESS;
                    textColor = SUCCESS;
                  } else if (showResult && isSelected && !isCorrect) {
                    bgColor = '#FEF2F2';
                    borderColor = ERROR;
                    textColor = ERROR;
                  } else if (!showResult && isSelected) {
                    bgColor = PURPLE_LIGHT;
                    borderColor = PRIMARY;
                    textColor = PRIMARY;
                  }
                  return (
                    <button
                      key={String(oi)}
                      type="button"
                      className="tappable"
                      disabled={!!state.feedback}
                      onClick={() => {
                        if (!state.feedback) handleAnswer(oi, oi === currentQ.correct);
                      }}
                      style={{
                        borderRadius: 12,
                        border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        padding: 14,
                        marginBottom: 10,
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'left'
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          border: `2px solid ${borderColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                          flexShrink: 0
                        }}
                      >
                        {showResult && isCorrect ? (
                          <span style={{ fontSize: 14 }}>✓</span>
                        ) : showResult && isSelected && !isCorrect ? (
                          <span style={{ fontSize: 14 }}>✗</span>
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 700, color: borderColor }}>
                            {String.fromCharCode(65 + oi)}
                          </span>
                        )}
                      </div>
                      <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: textColor }}>
                        {opt}
                      </span>
                    </button>
                  );
                })}

              {currentQ.type === 'true_false' && (
                <div style={{ display: 'flex' }}>
                  {[
                    { label: 'True ✓', value: true },
                    { label: 'False ✗', value: false }
                  ].map((opt, oi) => {
                    const isSelected = state.selectedAnswer === opt.value;
                    const isCorrect = opt.value === currentQ.correct;
                    const showResult = state.feedback !== null;
                    let bgColor = CARD;
                    let borderColor = BORDER;
                    if (showResult && isCorrect) {
                      bgColor = '#ECFDF5';
                      borderColor = SUCCESS;
                    } else if (showResult && isSelected && !isCorrect) {
                      bgColor = '#FEF2F2';
                      borderColor = ERROR;
                    } else if (!showResult && isSelected) {
                      bgColor = PURPLE_LIGHT;
                      borderColor = PRIMARY;
                    }
                    return (
                      <button
                        key={String(oi)}
                        type="button"
                        className="tappable"
                        disabled={!!state.feedback}
                        onClick={() => {
                          if (!state.feedback) handleAnswer(opt.value, opt.value === currentQ.correct);
                        }}
                        style={{
                          flex: 1,
                          borderRadius: 14,
                          border: `2px solid ${borderColor}`,
                          backgroundColor: bgColor,
                          padding: 18,
                          marginRight: oi === 0 ? 8 : 0,
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: 26, marginBottom: 6 }}>
                          {opt.value ? '✅' : '❌'}
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: showResult
                              ? isCorrect
                                ? SUCCESS
                                : isSelected
                                  ? ERROR
                                  : TEXT2
                              : isSelected
                                ? PRIMARY
                                : TEXT1
                          }}
                        >
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQ.type === 'fill_blank' && (
                <div>
                  <div
                    style={{
                      border: `2px solid ${
                        state.feedback
                          ? state.feedback.correct
                            ? SUCCESS
                            : ERROR
                          : state.fillText
                            ? PRIMARY
                            : BORDER
                      }`,
                      borderRadius: 12,
                      backgroundColor: CARD,
                      padding: '0 16px',
                      marginBottom: 12
                    }}
                  >
                    <input
                      type="text"
                      value={state.fillText}
                      onChange={(e) => state.setFillText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleFillSubmit();
                      }}
                      placeholder={currentQ.hint || 'Type your answer...'}
                      placeholderTextColor={TEXT2}
                      style={{ fontSize: 16, color: TEXT1, padding: '14px 0', width: '100%' }}
                      disabled={!!state.feedback}
                      autoCapitalize="none"
                    />
                  </div>
                  {!state.feedback && (
                    <button
                      type="button"
                      className="tappable block"
                      onClick={handleFillSubmit}
                      disabled={!state.fillText.trim()}
                      style={{
                        backgroundColor: PRIMARY,
                        borderRadius: 12,
                        padding: 14,
                        textAlign: 'center',
                        opacity: state.fillText.trim() ? 1 : 0.6
                      }}
                    >
                      <span style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700 }}>
                        Check Answer
                      </span>
                    </button>
                  )}
                </div>
              )}

              {state.feedback && (
                <div
                  style={{
                    borderRadius: 14,
                    padding: 16,
                    marginTop: 16,
                    backgroundColor: state.feedback.correct ? '#ECFDF5' : '#FEF2F2',
                    borderLeft: `4px solid ${state.feedback.correct ? SUCCESS : ERROR}`
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: state.feedback.correct ? SUCCESS : ERROR,
                      marginBottom: 6
                    }}
                  >
                    {state.feedback.correct ? '🎉 Correct! +5 XP' : '😅 Not quite...'}
                  </div>
                  <div style={{ fontSize: 14, color: TEXT1, lineHeight: 1.4 }}>
                    {currentQ.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {state.feedback && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 16,
              backgroundColor: CARD,
              borderTop: `1px solid ${BORDER}`
            }}
          >
            <button
              type="button"
              className="tappable block"
              onClick={handleNext}
              style={{
                backgroundColor: state.feedback.correct ? SUCCESS : PRIMARY,
                borderRadius: 14,
                padding: 16,
                textAlign: 'center'
              }}
            >
              <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 800 }}>
                {state.currentStep < state.questions.length - 1
                  ? 'Continue →'
                  : 'Finish Lesson 🎓'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
