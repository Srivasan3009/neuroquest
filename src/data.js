// All static content is ported verbatim from the original NeuroQuest project.

export const COURSES = [
  {
    id: 'course-1',
    title: 'AI Foundations',
    icon: '🧠',
    description: 'Start your AI journey with core concepts',
    difficulty: 'beginner',
    color: '#6366F1',
    units: [
      {
        id: 'unit-1-1',
        title: 'Introduction to AI',
        lessons: [
          { id: 'l-001', title: 'What is AI?', xp: 20, order: 0 },
          { id: 'l-002', title: 'AI vs Machine Learning', xp: 20, order: 1 },
          { id: 'l-003', title: 'History of AI', xp: 20, order: 2 },
          { id: 'l-004', title: 'Types of AI', xp: 25, order: 3 }
        ]
      },
      {
        id: 'unit-1-2',
        title: 'Data & Algorithms',
        lessons: [
          { id: 'l-005', title: 'What is Data?', xp: 20, order: 4 },
          { id: 'l-006', title: 'Algorithms Explained', xp: 25, order: 5 },
          { id: 'l-007', title: 'Training AI', xp: 25, order: 6 },
          { id: 'l-008', title: 'Inference', xp: 30, order: 7 }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Machine Learning',
    icon: '🤖',
    description: 'Dive into algorithms and models',
    difficulty: 'intermediate',
    color: '#EC4899',
    units: [
      {
        id: 'unit-2-1',
        title: 'Learning Types',
        lessons: [
          { id: 'l-009', title: 'Supervised Learning', xp: 30, order: 8 },
          { id: 'l-010', title: 'Unsupervised Learning', xp: 30, order: 9 },
          { id: 'l-011', title: 'Reinforcement Learning', xp: 35, order: 10 },
          { id: 'l-012', title: 'Training Data', xp: 25, order: 11 }
        ]
      },
      {
        id: 'unit-2-2',
        title: 'Model Quality',
        lessons: [
          { id: 'l-013', title: 'Overfitting', xp: 30, order: 12 },
          { id: 'l-014', title: 'Underfitting', xp: 30, order: 13 },
          { id: 'l-015', title: 'Bias & Variance', xp: 35, order: 14 }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Neural Networks',
    icon: '🕸️',
    description: 'Understand how deep learning works',
    difficulty: 'intermediate',
    color: '#8B5CF6',
    units: [
      {
        id: 'unit-3-1',
        title: 'Network Basics',
        lessons: [
          { id: 'l-016', title: 'Neurons & Layers', xp: 35, order: 15 },
          { id: 'l-017', title: 'Weights & Bias', xp: 35, order: 16 },
          { id: 'l-018', title: 'Activation Functions', xp: 40, order: 17 },
          { id: 'l-019', title: 'Backpropagation', xp: 40, order: 18 }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Generative AI',
    icon: '✨',
    description: 'Explore LLMs and creative AI',
    difficulty: 'advanced',
    color: '#F59E0B',
    units: [
      {
        id: 'unit-4-1',
        title: 'GenAI Basics',
        lessons: [
          { id: 'l-020', title: 'What is Generative AI?', xp: 40, order: 19 },
          { id: 'l-021', title: 'Large Language Models', xp: 40, order: 20 },
          { id: 'l-022', title: 'Tokens & Context', xp: 40, order: 21 },
          { id: 'l-023', title: 'Transformers', xp: 45, order: 22 },
          { id: 'l-024', title: 'Prompt Engineering', xp: 45, order: 23 }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    title: 'AI Projects',
    icon: '🚀',
    description: 'Build real AI projects',
    difficulty: 'advanced',
    color: '#10B981',
    locked: true,
    lockReason: 'Complete Neural Networks first',
    units: [
      {
        id: 'unit-5-1',
        title: 'Practical AI',
        lessons: [
          { id: 'l-025', title: 'Your First AI Model', xp: 50, order: 24 },
          { id: 'l-026', title: 'Data Preprocessing', xp: 50, order: 25 },
          { id: 'l-027', title: 'Evaluating Models', xp: 50, order: 26 }
        ]
      }
    ]
  }
];

export const QUESTIONS_BY_LESSON = {
  'l-001': [
    { id: 'q1', type: 'multiple_choice', text: 'What does AI stand for?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', 'Algorithmic Interface'], correct: 1, explanation: 'AI stands for Artificial Intelligence — the simulation of human-like intelligence by machines.' },
    { id: 'q2', type: 'true_false', text: 'AI can only perform tasks it has been explicitly programmed to do.', correct: false, explanation: 'Modern AI can learn from data and perform tasks it was not explicitly programmed for, thanks to machine learning.' },
    { id: 'q3', type: 'multiple_choice', text: 'Which of these is an example of AI in everyday life?', options: ['A light switch', 'A calculator', 'A voice assistant like Siri', 'A regular alarm clock'], correct: 2, explanation: 'Voice assistants like Siri use natural language processing and machine learning — both key AI technologies.' },
    { id: 'q4', type: 'fill_blank', text: 'AI aims to create machines that can ___ like humans.', answer: 'think', hint: 'Process, reason, and solve problems...', explanation: '"Think" or "reason" — AI systems are designed to simulate human cognitive functions.' }
  ],
  'l-002': [
    { id: 'q5', type: 'multiple_choice', text: 'Machine Learning is a __ of Artificial Intelligence.', options: ['replacement', 'subset', 'competitor', 'definition'], correct: 1, explanation: 'Machine Learning is a subset of AI that focuses on systems learning from data.' },
    { id: 'q6', type: 'true_false', text: 'All AI is Machine Learning.', correct: false, explanation: 'AI is the broader field. Machine Learning is just one approach within AI.' },
    { id: 'q7', type: 'multiple_choice', text: 'What does a Machine Learning model do?', options: ['Follow strict rules', 'Learn patterns from data', 'Run pre-written scripts', 'Copy human behavior exactly'], correct: 1, explanation: 'ML models identify patterns in data to make predictions without being explicitly programmed for each scenario.' },
    { id: 'q8', type: 'true_false', text: 'Deep Learning is a type of Machine Learning.', correct: true, explanation: 'Deep Learning is a subset of Machine Learning that uses neural networks with many layers.' }
  ],
  'l-009': [
    { id: 'q9', type: 'multiple_choice', text: 'In supervised learning, the training data is:', options: ['Unlabeled', 'Labeled with correct answers', 'Randomly generated', 'Manually written code'], correct: 1, explanation: 'Supervised learning uses labeled data — each input has a corresponding correct output the model learns from.' },
    { id: 'q10', type: 'true_false', text: 'Email spam detection is an example of supervised learning.', correct: true, explanation: 'Spam filters are trained on labeled emails (spam/not-spam) — a classic supervised learning task.' },
    { id: 'q11', type: 'multiple_choice', text: 'Which algorithm is commonly used in supervised learning?', options: ['K-Means Clustering', 'Linear Regression', 'PCA', 'Autoencoder'], correct: 1, explanation: 'Linear Regression is a fundamental supervised learning algorithm used to predict continuous values.' },
    { id: 'q12', type: 'fill_blank', text: 'Supervised learning requires labeled ___ to train models.', answer: 'data', hint: 'Training examples with correct outputs...', explanation: 'Labeled data pairs inputs with their correct outputs, allowing the model to learn the mapping.' }
  ],
  'l-020': [
    { id: 'q13', type: 'multiple_choice', text: 'What type of content can Generative AI produce?', options: ['Only text', 'Only images', 'Text, images, audio, and more', 'Only code'], correct: 2, explanation: 'Generative AI can create diverse content types including text, images, audio, video, and code.' },
    { id: 'q14', type: 'true_false', text: 'ChatGPT is an example of Generative AI.', correct: true, explanation: 'ChatGPT uses a Large Language Model (LLM) to generate human-like text responses.' },
    { id: 'q15', type: 'multiple_choice', text: 'What is the main difference between Generative AI and traditional AI?', options: ['Speed', 'Creating new content vs classifying existing content', 'Cost', 'Size of models'], correct: 1, explanation: 'Traditional AI typically classifies or predicts; Generative AI creates entirely new content.' },
    { id: 'q16', type: 'fill_blank', text: 'Generative AI models are trained on massive amounts of ___.', answer: 'data', hint: 'Text, images, code...', explanation: 'Generative AI models learn patterns from massive datasets to generate new, similar content.' }
  ]
};

export const DEFAULT_QUESTIONS = [
  { id: 'dq1', type: 'multiple_choice', text: 'What is the primary goal of this lesson?', options: ['Memorize facts', 'Build understanding', 'Pass a test', 'Write code'], correct: 1, explanation: 'The goal is to build genuine understanding of AI concepts.' },
  { id: 'dq2', type: 'true_false', text: 'Learning AI concepts takes practice and repetition.', correct: true, explanation: 'Like any skill, understanding AI improves with repeated exposure and practice.' },
  { id: 'dq3', type: 'multiple_choice', text: 'What motivates AI researchers?', options: ['Fame', 'Money only', 'Solving real-world problems', 'Gaming'], correct: 2, explanation: 'AI research is driven by the desire to solve meaningful human challenges.' }
];

export const ACHIEVEMENTS_CATALOG = [
  { id: 'ach-1', title: 'First Step', description: 'Complete your first lesson', icon: '🌟', type: 'lessons_completed', value: 1, xp: 50 },
  { id: 'ach-2', title: 'On a Roll', description: 'Complete 5 lessons', icon: '🔥', type: 'lessons_completed', value: 5, xp: 100 },
  { id: 'ach-3', title: 'Scholar', description: 'Complete 10 lessons', icon: '📚', type: 'lessons_completed', value: 10, xp: 200 },
  { id: 'ach-4', title: 'XP Collector', description: 'Earn 100 XP total', icon: '⭐', type: 'xp_threshold', value: 100, xp: 50 },
  { id: 'ach-5', title: 'XP Hunter', description: 'Earn 500 XP total', icon: '🏅', type: 'xp_threshold', value: 500, xp: 100 },
  { id: 'ach-6', title: 'Streak Starter', description: 'Maintain a 3-day streak', icon: '🔥', type: 'streak_days', value: 3, xp: 75 },
  { id: 'ach-7', title: 'Dedicated Learner', description: 'Maintain a 7-day streak', icon: '💪', type: 'streak_days', value: 7, xp: 150 },
  { id: 'ach-8', title: 'Perfectionist', description: 'Get a perfect score on 3 lessons', icon: '🏆', type: 'perfect_lessons', value: 3, xp: 100 },
  { id: 'ach-9', title: 'AI Curious', description: 'Complete AI Foundations course', icon: '🧠', type: 'lessons_completed', value: 8, xp: 250 },
  { id: 'ach-10', title: 'Night Owl', description: 'Earn 1000 XP total', icon: '🦉', type: 'xp_threshold', value: 1000, xp: 300 }
];

export const DAILY_CHALLENGES = [
  { id: 'dc-1', title: 'Quick Learner', description: 'Complete 2 lessons today', icon: '📖', xp: 50, target: 2, type: 'complete_lessons' },
  { id: 'dc-2', title: 'Perfect Day', description: 'Get a perfect score on 1 lesson', icon: '💎', xp: 75, target: 1, type: 'perfect_lessons' },
  { id: 'dc-3', title: 'Knowledge Seeker', description: 'Complete 3 lessons today', icon: '🔍', xp: 100, target: 3, type: 'complete_lessons' }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'NeuralNinja', avatar: '🥷', weeklyXP: 2450, level: 12 },
  { rank: 2, name: 'DataDragon', avatar: '🐉', weeklyXP: 2180, level: 10 },
  { rank: 3, name: 'AlgoAce', avatar: '♟️', weeklyXP: 1950, level: 9 },
  { rank: 4, name: 'MLMaster', avatar: '🎯', weeklyXP: 1720, level: 8 },
  { rank: 5, name: 'ByteWizard', avatar: '🧙', weeklyXP: 1580, level: 7 },
  { rank: 6, name: 'DeepDiver', avatar: '🤿', weeklyXP: 1340, level: 6 },
  { rank: 7, name: 'TensorTiger', avatar: '🐯', weeklyXP: 1210, level: 6 },
  { rank: 8, name: 'GPTGuru', avatar: '🔮', weeklyXP: 980, level: 5 },
  { rank: 9, name: 'CodeCraft', avatar: '⚡', weeklyXP: 840, level: 4 },
  { rank: 10, name: 'AIArtist', avatar: '🎨', weeklyXP: 720, level: 4 }
];

export const EMOJIS = ['🧠', '🤖', '🦊', '🐯', '🦁', '🐸', '🦄', '🐲', '🚀', '⚡'];

export const DEFAULT_PROFILE = {
  username: 'NeuroLearner',
  level: 1,
  total_xp: 0,
  current_streak: 0,
  longest_streak: 0,
  lessons_completed: 0,
  energy: 5,
  max_energy: 5,
  weekly_xp: 0,
  perfect_lessons: 0,
  bio: 'AI enthusiast on a learning journey 🚀',
  avatar_emoji: '🧠',
  avatar_url: null,
  daily_goal: 2,
  daily_completed: 0,
  last_lesson_date: null,
  lastDailyReset: null,
  user_rank: 11
};

// Flat helpers (same logic as the original ALL_LESSONS_FLAT / LESSONS_BY_ID)
export const ALL_LESSONS_FLAT = [];
COURSES.forEach((course) => {
  course.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      ALL_LESSONS_FLAT.push(
        Object.assign({}, lesson, {
          courseId: course.id,
          courseTitle: course.title,
          courseColor: course.color,
          courseIcon: course.icon,
          unitId: unit.id,
          unitTitle: unit.title
        })
      );
    });
  });
});

export const LESSONS_BY_ID = {};
ALL_LESSONS_FLAT.forEach((l) => {
  LESSONS_BY_ID[l.id] = l;
});