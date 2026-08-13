import { useEffect, useRef, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import XPBar from '../components/XPBar';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  ACHIEVEMENTS_CATALOG,
  COURSES,
  EMOJIS
} from '../data';
import {
  ACCENT,
  BG,
  BORDER,
  ERROR,
  GOLD,
  PRIMARY,
  SUCCESS,
  TEXT1,
  TEXT2,
  WEB_TAB_MENU_PADDING,
  glassCard,
  softCard
} from '../theme';

function downscaleToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the image.'));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file is not a valid image.'));
      img.onload = () => {
        const size = 160;
        const scale = Math.min(size / img.width, size / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Port of the original ProfileScreen (camera → file upload; Supabase → localStorage).
export default function Profile() {
  const { profile, setProfile, completed, earnedAchs, setEarnedAchs } = useProfile();
  const { signOut } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState(profile.username);
  const [editBio, setEditBio] = useState(profile.bio || '');
  const [signingOut, setSigningOut] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    setEditUsername(profile.username);
    setEditBio(profile.bio || '');
  }, [profile.username, profile.bio]);

  // Achievement unlock logic (same as original).
  useEffect(() => {
    const newAchs = Object.assign({}, earnedAchs);
    let changed = false;
    ACHIEVEMENTS_CATALOG.forEach((ach) => {
      if (newAchs[ach.id]) return;
      const completedIds = Object.keys(completed).filter((k) => completed[k]);
      let qualifies = false;
      if (ach.type === 'lessons_completed' && completedIds.length >= ach.value) qualifies = true;
      if (ach.type === 'xp_threshold' && profile.total_xp >= ach.value) qualifies = true;
      if (ach.type === 'streak_days' && profile.current_streak >= ach.value) qualifies = true;
      if (ach.type === 'perfect_lessons' && profile.perfect_lessons >= ach.value) qualifies = true;
      if (qualifies) {
        newAchs[ach.id] = true;
        changed = true;
      }
    });
    if (changed) setEarnedAchs(newAchs);
  }, [profile.total_xp, profile.current_streak, profile.perfect_lessons, completed, earnedAchs, setEarnedAchs]);

  const handleSaveProfile = () => {
    setProfile((prev) => Object.assign({}, prev, { username: editUsername, bio: editBio }));
    setIsEditing(false);
  };

  const handleTakePhoto = async () => {
    fileRef.current && fileRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target && e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const dataUrl = await downscaleToDataUrl(file);
      setPhotoError(null);
      setProfile((prev) => Object.assign({}, prev, { avatar_url: dataUrl, avatar_emoji: null }));
    } catch (err) {
      setPhotoError(err.message || 'Could not use that image.');
    }
  };

  const handleSignOut = () => {
    if (window.confirm('Sign out of NeuroQuest?')) {
      setSigningOut(true);
      // Brief delay so the spinner shows, then sign out.
      setTimeout(() => signOut(), 200);
    }
  };

  const xpForNextLevel = profile.level * 200;
  const xpProgress = Math.min((profile.total_xp % xpForNextLevel) / xpForNextLevel, 1);
  const completedIds = Object.keys(completed).filter((k) => completed[k]);
  const earnedAchIds = Object.keys(earnedAchs).filter((k) => earnedAchs[k]);

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AnimatedBackground />
      <div
        style={{
          backgroundColor: PRIMARY,
          paddingTop: 8,
          paddingBottom: 24,
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className="tappable"
          onClick={handleTakePhoto}
          style={{ marginBottom: 12, position: 'relative', width: 80, height: 80 }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #FFFFFF',
              overflow: 'hidden'
            }}
          >
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="avatar"
                style={{ width: 80, height: 80, borderRadius: 40, objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: 38 }}>{profile.avatar_emoji}</span>
            )}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 26,
              height: 26,
              borderRadius: 13,
              backgroundColor: ACCENT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFFFFF'
            }}
          >
            <span style={{ fontSize: 13 }}>📷</span>
          </div>
        </button>

        {photoError && (
          <div style={{ color: '#FCA5A5', fontSize: 11, marginBottom: 4 }}>{photoError}</div>
        )}

        {isEditing ? (
          <div style={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <input
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 700,
                textAlign: 'center',
                borderBottom: '2px solid rgba(255,255,255,0.5)',
                paddingBottom: 4,
                minWidth: 150,
                marginBottom: 8,
                width: '60%'
              }}
              placeholder="Username"
              autoCapitalize="none"
            />
            <input
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: 13,
                textAlign: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: 4,
                minWidth: 200,
                marginBottom: 12,
                width: '70%'
              }}
              placeholder="Your bio..."
            />
            <div style={{ display: 'flex' }}>
              <button
                type="button"
                className="tappable"
                onClick={handleSaveProfile}
                style={{
                  backgroundColor: SUCCESS,
                  padding: '8px 20px',
                  borderRadius: 20,
                  marginRight: 8,
                  width: 'auto'
                }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 14 }}>Save</span>
              </button>
              <button
                type="button"
                className="tappable"
                onClick={() => setIsEditing(false)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '8px 20px',
                  borderRadius: 20,
                  width: 'auto'
                }}
              >
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 14 }}>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
              {profile.username}
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 13,
                marginBottom: 12,
                textAlign: 'center'
              }}
            >
              {profile.bio}
            </div>
            <button
              type="button"
              className="tappable"
              onClick={() => {
                setIsEditing(true);
                setEditUsername(profile.username);
                setEditBio(profile.bio || '');
              }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '6px 16px',
                borderRadius: 16,
                width: 'auto'
              }}
            >
              <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 600 }}>
                ✏️ Edit Profile
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 5 }}>
        <div style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: WEB_TAB_MENU_PADDING }}>
          <div style={{ ...glassCard, marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: TEXT1 }}>
                ⭐ Level {profile.level}
              </span>
              <span style={{ fontSize: 13, color: TEXT2 }}>{profile.total_xp} XP total</span>
            </div>
            <XPBar progress={xpProgress} color={PRIMARY} height={12} />
            <div style={{ fontSize: 12, color: TEXT2, marginTop: 6 }}>
              {Math.round(xpProgress * 100)}% to Level {profile.level + 1}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 4 }}>
            {[
              { icon: '🔥', label: 'Streak', value: profile.current_streak + ' days' },
              { icon: '📚', label: 'Lessons', value: String(completedIds.length) },
              { icon: '🏅', label: 'Best Streak', value: profile.longest_streak + ' days' },
              { icon: '💎', label: 'Perfect', value: String(profile.perfect_lessons) }
            ].map((s, si) => (
              <div
                key={String(si)}
                style={{
                  width: '48%',
                  ...softCard,
                  marginBottom: 10,
                  marginRight: si % 2 === 0 ? '4%' : 0,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: PRIMARY }}>{s.value}</div>
                <div style={{ fontSize: 12, color: TEXT2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 17, fontWeight: 800, color: TEXT1, marginBottom: 12, marginTop: 8 }}>
            😀 Choose Avatar
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              ...glassCard,
              borderRadius: 16,
              padding: 12,
              marginBottom: 16
            }}
          >
            {EMOJIS.map((em, ei) => (
              <button
                key={em}
                type="button"
                className="tappable"
                onClick={() =>
                  setProfile((prev) =>
                    Object.assign({}, prev, { avatar_emoji: em, avatar_url: null })
                  )
                }
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: profile.avatar_emoji === em ? '#EEF2FF' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 4,
                  border: profile.avatar_emoji === em ? `2px solid ${PRIMARY}` : '2px solid transparent'
                }}
              >
                <span style={{ fontSize: 24 }}>{em}</span>
              </button>
            ))}
          </div>

          <div style={{ fontSize: 17, fontWeight: 800, color: TEXT1, marginBottom: 12 }}>
            🏆 Achievements ({earnedAchIds.length}/{ACHIEVEMENTS_CATALOG.length})
          </div>
          {ACHIEVEMENTS_CATALOG.map((ach, ai) => {
            const earned = earnedAchs[ach.id];
            return (
              <div
                key={ach.id}
                style={{
                  ...softCard,
                  borderRadius: 16,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: earned ? 1 : 0.6,
                  background: earned ? undefined : 'rgba(0,0,0,0.03)',
                  border: earned ? undefined : '1px solid transparent',
                  boxShadow: earned ? '0 4px 8px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: earned ? GOLD + '22' : BORDER,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: 22, opacity: earned ? 1 : 0.4 }}>{ach.icon}</span>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, color: earned ? TEXT1 : TEXT2 }}
                  >
                    {ach.title}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT2 }}>{ach.description}</div>
                </div>
                {earned ? (
                  <div
                    style={{
                      backgroundColor: GOLD + '22',
                      padding: '4px 8px',
                      borderRadius: 8,
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: 12, color: GOLD, fontWeight: 700 }}>
                      +{ach.xp} XP
                    </span>
                  </div>
                ) : (
                  <span style={{ fontSize: 16, color: TEXT2, flexShrink: 0 }}>🔒</span>
                )}
              </div>
            );
          })}

          <div style={{ fontSize: 17, fontWeight: 800, color: TEXT1, marginBottom: 12, marginTop: 8 }}>
            📊 Course Progress
          </div>
          {COURSES.map((course, ci) => {
            if (course.locked) return null;
            const courseLessons = [];
            course.units.forEach((u) => u.lessons.forEach((l) => courseLessons.push(l)));
            const doneCount = courseLessons.filter((l) => completed[l.id]).length;
            const prog = courseLessons.length > 0 ? doneCount / courseLessons.length : 0;
            return (
              <div key={course.id} style={{ ...softCard, marginBottom: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 20, marginRight: 8 }}>{course.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: TEXT1 }}>
                      {course.title}
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: course.color, fontWeight: 600 }}>
                    {Math.round(prog * 100)}%
                  </span>
                </div>
                <XPBar progress={prog} color={course.color} height={8} />
                <div style={{ fontSize: 11, color: TEXT2, marginTop: 4 }}>
                  {doneCount} of {courseLessons.length} lessons complete
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: 8, marginBottom: 8 }}>
            <button
              type="button"
              className="tappable block"
              onClick={handleSignOut}
              disabled={signingOut}
              style={{
                backgroundColor: '#FEF2F2',
                borderRadius: 16,
                border: `1px solid ${ERROR}30`,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {signingOut ? (
                <span className="spinner spinner-error" />
              ) : (
                <>
                  <span style={{ fontSize: 18, marginRight: 8 }}>🚪</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: ERROR }}>Sign Out</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}