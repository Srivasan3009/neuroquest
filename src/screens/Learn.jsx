import { useProfile } from '../context/ProfileContext';
import CourseRoadmap from '../components/CourseRoadmap';
import { BG, TEXT1, WEB_TAB_MENU_PADDING, headerGlass } from '../theme';
import { COURSES } from '../data';

// Port of the original LearnScreen.
export default function Learn({ openLesson }) {
  const { completed } = useProfile();

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ ...headerGlass, paddingTop: 8, paddingBottom: 16, paddingHorizontal: 20 }}>
        <div
          className="font-heading"
          style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 700 }}
        >
          📚 Learning Path
        </div>
        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 2 }}>
          Master AI one lesson at a time
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <div
          className="content-col"
          style={{
            paddingTop: 16,
            paddingBottom: WEB_TAB_MENU_PADDING,
            paddingHorizontal: 16
          }}
        >
          {COURSES.map((course) => (
            <CourseRoadmap
              key={course.id}
              course={course}
              completed={completed}
              onLessonPress={(lessonId) => openLesson(lessonId)}
            />
          ))}
          <div style={{ textAlign: 'center', fontSize: 12, color: TEXT1, opacity: 0.45, paddingBottom: 8 }}>
            Complete lessons in order to unlock the next 🔓
          </div>
        </div>
      </div>
    </div>
  );
}