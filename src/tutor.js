// AI Tutor backend.
// The original app called the paid OpenAI API (gpt-4o-mini) using a secret key.
// Here we call Pollinations.ai — a genuinely free, no-signup, no-key,
// OpenAI-compatible chat endpoint. If it is unreachable we fall back to a
// small built-in knowledge base so the Tutor never bricks.

const ENDPOINTS = [
  'https://text.pollinations.ai/openai',
  'https://text.pollinations.ai/'
];

const SYSTEM_PROMPT =
  "You are NeuroQuest's friendly AI tutor helping beginners learn Artificial Intelligence. " +
  'Explain concepts clearly using simple language, analogies, and examples. ' +
  'Keep responses concise (2-4 paragraphs max). Use emojis to make explanations engaging. ' +
  'Focus on AI, Machine Learning, Neural Networks, and Generative AI topics.';

function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const opts = Object.assign({}, options, { signal: controller.signal });
  return fetch(url, opts).then(
    (response) => {
      clearTimeout(timer);
      return response;
    },
    (err) => {
      clearTimeout(timer);
      throw err;
    }
  );
}

function fetchWithFallback(urls, options, idx) {
  const i = idx || 0;
  return fetchWithTimeout(urls[i], options, 25000).then(
    (response) => {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response;
    },
    (err) => {
      if (i + 1 < urls.length) return fetchWithFallback(urls, options, i + 1);
      throw err;
    }
  );
}

export async function askTutor(userText) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userText }
  ];
  const body = JSON.stringify({
    model: 'openai',
    messages,
    max_tokens: 500,
    temperature: 0.7
  });

  try {
    const res = await fetchWithFallback(ENDPOINTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    const data = await res.json();
    const content =
      data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (content && String(content).trim()) return String(content).trim();
    throw new Error('empty response');
  } catch {
    return offlineAnswer(userText);
  }
}

// --- Offline fallback knowledge base -------------------------------------
const KNOWLEDGE = [
  {
    keys: ['neural network', 'neural', 'network'],
    text:
      "🕸️ A neural network is a computer system inspired by the human brain. It's made of layers of simple units (neurons) that each hold a number called a weight. During training, the network adjusts those weights so that patterns in the data get 'learned'. Deep learning is just a neural network with many layers stacked together. Think of it like a team of specialists: each layer picks out different features, and together they solve the problem. 🤖"
  },
  {
    keys: ['machine learning', 'ml'],
    text:
      "🤖 Machine Learning is a subset of Artificial Intelligence where instead of being explicitly programmed, a computer *learns patterns from data*. Given thousands of examples, an ML model figures out the rules itself. For example, a spam filter learns what spam looks like from labeled emails rather than from hand-written rules. Three big flavors: Supervised (labeled examples), Unsupervised (finds hidden structure), and Reinforcement (learns from rewards). 🎯"
  },
  {
    keys: ['overfit', 'over-fitting', 'overfitting'],
    text:
      "😅 Overfitting is when a model memorizes the training data too well and fails on new data — like a student who memorizes the textbook word-for-word but can't answer a rephrased question. The model has 'too much' capacity for the amount of data. Fixes include more training data, simplifying the model, regularization, or early stopping. Its opposite, underfitting, is when the model is too simple to capture the pattern at all. ⚖️"
  },
  {
    keys: ['chatgpt', 'gpt', 'llm', 'large language', 'generative'],
    text:
      "✨ ChatGPT is a Generative AI product built on a Large Language Model (LLM). An LLM is trained on massive amounts of text and learns to predict the most likely next word — over and over — which is how it produces fluent replies. It doesn't truly 'know' facts; it generates text that statistically matches what it has seen. That's why it can hallucinate. Useful mental model: it's a super-powered autocomplete. 🧠"
  },
  {
    keys: ['supervised', 'label'],
    text:
      "📋 Supervised Learning is when a model trains on *labeled* data — every input has its correct answer attached. For example: emails tagged spam/not-spam, or house prices with their sale price. The model learns the mapping from input to output, then predicts labels on brand-new data. Linear regression is the classic starter algorithm. ✅"
  },
  {
    keys: ['unsupervised', 'cluster'],
    text:
      "🧩 Unsupervised Learning finds structure in data that has *no labels*. Instead of predicting an answer, the model discovers patterns — like grouping customers into clusters (K-Means) or compressing data (autoencoders). Use it when you want to explore data or find hidden groups without knowing the 'right answer' in advance. 🔍"
  },
  {
    keys: ['reinforcement', 'reward', 'agent'],
    text:
      "🎮 Reinforcement Learning trains an agent to make decisions by trial and error. The agent takes actions in an environment and receives rewards (or penalties), then adjusts its strategy to maximize total reward over time. Think of training a dog with treats, or an AI learning to play chess by playing millions of games against itself. ♟️"
  },
  {
    keys: ['transformer', 'attention', 'token'],
    text:
      "🔀 A Transformer is the architecture behind modern LLMs. Its superpower is *self-attention*: while reading a sentence, it weighs how much every word relates to every other word. Text is split into small pieces called tokens, and the model predicts the next token. Stack many attention layers and you get something like GPT. It's why AI can follow context across long passages. 📚"
  },
  {
    keys: ['ai', 'artificial intelligence', 'what is ai', 'artificial'],
    text:
      "🧠 Artificial Intelligence is the field of building machines that can perform tasks that normally require human intelligence — understanding language, recognizing images, making decisions. Modern AI works by *learning from data* rather than following hand-written rules. AI is the big umbrella; Machine Learning and Deep Learning live underneath it. 🚀"
  },
  {
    keys: ['streak', 'xp', 'level', 'app', 'neuroquest', 'energy'],
    text:
      "🌟 NeuroQuest helps you learn AI in bite-size lessons! Finish lessons to earn XP and level up. Keep a daily streak for extra bragging rights, and use the Profile tab to check your achievements and course progress. The faster you answer quizzes correctly, the more XP you earn — get a perfect score for a +10 XP bonus! 📚"
  }
];

function offlineAnswer(userText) {
  const t = userText.toLowerCase();
  const match = KNOWLEDGE.find((item) => item.keys.some((k) => t.includes(k)));
  if (match) {
    return match.text + "\n\n(Offline mode: I couldn't reach the online AI tutor, so I answered from my built-in knowledge base. Check your internet connection and try again for a richer answer!)";
  }
  return (
    "🤖 I'm running in offline mode right now, so I can answer from my built-in knowledge base. " +
    'Try asking me about neural networks, machine learning, overfitting, ChatGPT/LLMs, or transformers! ' +
    'Once your internet connection is back, I can give much richer answers via the free Pollinations AI API.'
  );
}
