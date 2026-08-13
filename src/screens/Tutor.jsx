import { useEffect, useRef, useState } from 'react';
import { askTutor } from '../tutor';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  BG,
  BORDER,
  ERROR,
  GLASS_BG,
  GLASS_BORDER,
  PRIMARY,
  PURPLE_LIGHT,
  SUCCESS,
  TEXT1,
  TEXT2
} from '../theme';

const QUICK_QUESTIONS = [
  "Explain ML like I'm 5",
  'What is a neural network?',
  'How does ChatGPT work?',
  'What is overfitting?'
];

// Port of the original TutorScreen. OpenAI is replaced with the free
// Pollinations.ai endpoint (see tutor.js), with an offline fallback.
export default function Tutor() {
  const [messages, setMessages] = useState([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm your NeuroQuest AI Tutor 🧠 Ask me anything about AI, Machine Learning, Neural Networks, or any concept from your lessons!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tutorError, setTutorError] = useState(null);
  const scrollRef = useRef(null);

  const sendMessage = async (text) => {
    const msgText = text || inputText.trim();
    if (!msgText || isLoading) return;
    const userMsg = { id: String(Date.now()), role: 'user', text: msgText };
    setMessages((prev) => prev.concat([userMsg]));
    setInputText('');
    setIsLoading(true);
    setTutorError(null);

    try {
      const reply = await askTutor(msgText);
      setMessages((prev) =>
        prev.concat([{ id: String(Date.now() + 1), role: 'assistant', text: reply }])
      );
    } catch {
      setTutorError('Could not reach the AI tutor. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  return (
    <div style={{ flex: 1, backgroundColor: BG, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <AnimatedBackground />
      <div
        style={{
          backgroundColor: PRIMARY,
          paddingTop: 8,
          paddingBottom: 16,
          paddingHorizontal: 20,
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12
            }}
          >
            <span style={{ fontSize: 20 }}>🤖</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800 }}>AI Tutor</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: SUCCESS,
                  marginRight: 5
                }}
              />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="scroll" style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 5 }}>
        <div style={{ padding: 16, paddingBottom: 8 }}>
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: isUser ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  marginBottom: 12
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: PURPLE_LIGHT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 8,
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: 16 }}>🤖</span>
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '75%',
                    backgroundColor: isUser ? PRIMARY : GLASS_BG,
                    borderRadius: 16,
                    borderBottomRightRadius: isUser ? 4 : 16,
                    borderBottomLeftRadius: isUser ? 16 : 4,
                    padding: 12,
                    border: isUser ? 'none' : `1px solid ${GLASS_BORDER}`,
                    boxShadow: isUser ? 'none' : '0 2px 4px rgba(0,0,0,0.08)'
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: isUser ? '#FFFFFF' : TEXT1,
                      lineHeight: 1.4,
                      whiteSpace: 'pre-wrap',
                      textAlign: 'left'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: PURPLE_LIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 8
                }}
              >
                <span style={{ fontSize: 16 }}>🤖</span>
              </div>
              <div
                style={{
                  backgroundColor: GLASS_BG,
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  padding: 14,
                  border: `1px solid ${GLASS_BORDER}`
                }}
              >
                <span className="thinking-dots">
                  <span />
                  <span />
                  <span />
                </span>{' '}
                <span style={{ color: TEXT2, fontSize: 14, marginLeft: 6 }}>Thinking...</span>
              </div>
            </div>
          )}

          {tutorError && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                borderRadius: 12,
                padding: 12,
                marginBottom: 8,
                borderLeft: `3px solid ${ERROR}`
              }}
            >
              <div style={{ color: ERROR, fontSize: 13 }}>{tutorError}</div>
            </div>
          )}

          {messages.length === 1 && (
            <div>
              <div
                style={{ fontSize: 13, color: TEXT2, marginBottom: 10, textAlign: 'center' }}
              >
                Try asking:
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {QUICK_QUESTIONS.map((q, qi) => (
                  <button
                    key={String(qi)}
                    type="button"
                    className="tappable"
                    onClick={() => sendMessage(q)}
                    style={{
                      backgroundColor: GLASS_BG,
                      borderRadius: 20,
                      padding: '8px 12px',
                      margin: 4,
                      border: `1px solid ${GLASS_BORDER}`,
                      width: 'auto'
                    }}
                  >
                    <span style={{ color: PRIMARY, fontSize: 12, fontWeight: 600 }}>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: GLASS_BG,
          borderTop: `1px solid ${GLASS_BORDER}`,
          padding: 12,
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: BG,
              borderRadius: 24,
              border: `1.5px solid ${inputText ? PRIMARY : BORDER}`,
              padding: '10px 16px',
              marginRight: 10,
              maxHeight: 100,
              overflowY: 'auto'
            }}
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about AI concepts..."
              placeholderTextColor={TEXT2}
              style={{ fontSize: 14, color: TEXT1, width: '100%', resize: 'none', minHeight: 20 }}
              rows={1}
            />
          </div>
          <button
            type="button"
            className="tappable"
            disabled={!inputText.trim() || isLoading}
            onClick={() => sendMessage()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: inputText.trim() ? PRIMARY : BORDER,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: 18 }}>🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}
