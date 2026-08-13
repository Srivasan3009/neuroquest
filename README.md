# 🧠 NeuroQuest (Free Web Edition)

A 100% free, self-hostable web port of the **Thunkable/React Native** "NeuroQuest" app you
exported. No Thunkable plan, no paid APIs, no backend — the whole app runs as a static
site you can host on **GitHub Pages** or **Cloudflare Pages** for **$0**.

---

## A. What was in the original app

| Area | Found in the export |
| --- | --- |
| Screens | SignIn · Home · Learn · Lesson (quiz) · LessonComplete · Leaderboard · AI Tutor · Profile |
| UI kit | React Native components (`View/Text/ScrollView/TouchableOpacity/TextInput/…`), glassmorphism cards, emoji UI |
| Navigation | `@react-navigation` bottom tabs + stack (5 tabs + lesson flow) |
| Data | 5 courses (27 lessons), quizzes per lesson, achievements, daily challenges, mock leaderboard — all **static in the file** |
| Auth + storage | **Supabase** (`supabase.auth`, `supabase.from('profiles')`) — server-backed accounts & profile sync |
| AI Tutor | **OpenAI** `gpt-4o-mini` chat completions using a paid secret key (`AppSecrets.OPENAI_API_KEY`) |
| Camera | `platform-hooks` `useCamera` for avatar photos |
| Icons | emoji + `@react-native-vector-icons` |
| Animations | `Animated.loop` background blobs |

## B. What can be reused (and was)

- **All course/quiz/achievement/challenge/leaderboard content** — copied 1:1 into `src/data.js`.
- **Every screen's layout & logic** — ported faithfully to React + CSS (same colors, same
  component tree, same XP/streak/level math).
- **Design tokens** (`theme.js`) — identical palette (`#6366F1`, `#EC4899`, `#F8F7FF`, …).

## C. What needed to be rebuilt / swapped

| Original | Replaced with | Why |
| --- | --- | --- |
| Supabase Auth | Local accounts in `localStorage` | Free, no server, no project setup |
| Supabase profiles table | Per-user JSON in `localStorage` | Same |
| OpenAI API (paid key) | **Pollinations.ai** free no-key API + built-in offline fallback | Genuinely free |
| `useCamera` (native) | `<input type="file">` + canvas downscale | Camera UI isn't web-native |
| React Navigation | Lightweight **hash router** (`#/app`, `#/lesson/…`) | Refresh-safe on static hosts, ~0 bytes of extra deps |
| RN `Animated` | CSS keyframe blobs | Cheaper and smooth on web |

## D. Recommended free stack

- **Vite + React** (dep: `react`, `react-dom` only — tiny, instant builds).
- **localStorage** for auth/progress/XP/achievements (no backend, works offline-first).
- **Pollinations.ai** `https://text.pollinations.ai/openai` for the AI tutor (no account, no key).
- Host anywhere that serves static files.
- Optional upgrades (all still free): Supabase free tier for cross-device sync, Cloudflare KV,
  or IndexedDB — see [Going further](#going-further).

## E. Deploy for $0

### Option 1 — GitHub Pages (recommended, automatic)

1. Create a repo and push this folder to it (`git init`, add, commit, push to `main`).
2. In **Settings → Pages → Build and deployment**, set Source to **GitHub Actions**.
3. Push — `.github/workflows/deploy.yml` builds `dist` and deploys automatically.
4. Your site is live at `https://<your-username>.github.io/<repo>/`.

Local test first:

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs ./dist
npm run preview  # serve the production build
```

> Note: `vite.config.js` uses `base: './'`, so it works from a repo subpath too.

### Option 2 — Cloudflare Pages (free)

1. Push this folder to a GitHub repo.
2. In Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: `npm run build` · Output directory: `dist`.
4. Done — instant free HTTPS site, auto-deploys on every push.

Both work because the app is fully client-side (the only external call is the free tutor API).

---

## Project structure

```
neuroquest-web/
├── index.html
├── package.json
├── vite.config.js            # base './' → works under any subpath
├── public/                   # favicon, .nojekyll
├── .github/workflows/deploy.yml   # GitHub Actions → Pages
└── src/
    ├── main.jsx              # React entry
    ├── App.jsx               # Root + auth gate + hash routing
    ├── styles.css            # globals, phone-frame, animations, tab bar
    ├── theme.js              # design tokens (1:1 from original)
    ├── data.js               # all courses/quizzes/achievements/… (ported)
    ├── storage.js            # localStorage auth + per-user save/load
    ├── tutor.js              # free Pollinations endpoint + offline fallback
    ├── router.js             # tiny hash router (refresh-safe)
    ├── context/              # AuthContext, ProfileContext
    ├── components/           # XPBar, StatPill, AnimatedBackground, CourseRoadmap, BottomTabBar
    └── screens/              # SignIn, Home, Learn, Lesson, LessonComplete, Leaderboard, Tutor, Profile
```

## Features kept from the original

- Sign in / sign up (now instant, no email confirmation)
- Earning XP, levels (`level = floor(xp/200)+1`), daily & longest streaks
- Daily goal counter (auto-resets on a new day)
- Gated lesson unlocking & the locked 5th course
- Quiz types: multiple choice, true/false, fill-in-the-blank with explanations
- Perfect-score bonus (+10 XP) and completion screen with accuracy
- Leaderboard with podium + "YOU" card (static mock data, like the original)
- AI Tutor with quick-answer chips
- Achievements engine, avatar emoji picker, **photo upload** avatar, course progress, edit profile, sign out

## Trade-offs & honest limitations

- **Accounts live in the browser.** Data stays on the device/browser profile — it does not sync
  across devices like Supabase did. (If you want real accounts later, Supabase has a free tier and
  this code already isolates data per email so migration is easy.)
- **Demo-grade auth security.** Passwords are lightly hashed; treat this as a personal app, not a
  banking app.
- **AI Tutor is rate-limited** by the free Pollinations service and falls back to a built-in
  knowledge base when offline/overloaded (the app still works).
- **Leaderboard** is the same mock data from the original (no real multiplayer).
- Avatar photo uploads can only be stored small (downscaled to 160px) to fit `localStorage` limits.

### Free API alternatives (if you ever want options)

| Need | Free option |
| --- | --- |
| AI chat (now) | Pollinations.ai — no key, no signup |
| AI chat (key-based, generous free tier) | Groq, OpenRouter, Google Gemini API free tier |
| Cross-device sync/auth | Supabase free tier, Firebase free tier |
| Serverless data | Cloudflare Workers + KV free tier |

## Running / building

Requires Node.js 18+. The `npm`/`node` binaries must be on `PATH`.

```bash
# if 'npm' isn't recognised on Windows, run:
#   $env:Path = "C:\Program Files\nodejs;" + $env:Path
npm install
npm run dev
```

## Going further

To add real cross-device accounts later without paying:
1. Create a free Supabase project.
2. Add the env/build-var URL + anon key.
3. Swap the thin `storage.js` functions for Supabase calls — the rest of the app is
   already written against `signIn/signUp/loadUserData/saveUserData`, so this is contained.