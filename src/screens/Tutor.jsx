import { useEffect, useRef, useState } from 'react';
import { askTutor } from '../tutor';
import AnimatedBackground from '../components/AnimatedBackground';
import {
  BG,
  ERROR,
  ERROR_BG,
  PRIMARY_GRAD,
  SUCCESS,
  TEXT1,
  TEXT2,
  headerGlass
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
          ...headerGlass,
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
              backgroundColor: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <span style={{ fontSize: 20 }}>🤖</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div
              className="font-heading"
              style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}
            >
              AI Tutor
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: SUCCESS,
                  marginRight: 5,
                  boxShadow: '0 0 8px rgba(52,211,153,0.8)'
                }}
              />
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>Online</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="scroll" style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 5 }}>
        <div className="content-col" style={{ padding: 16, paddingBottom: 8 }}>
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
                      backgroundColor: 'rgba(129,140,248,0.20)',
                      border: '1px solid rgba(255,255,255,0.12)',
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
                    background: isUser
                      ? PRIMARY_GRAD
                      : 'rgba(255,255,255,0.08)',
                    borderRadius: 18,
                    borderBottomRightRadius: isUser ? 4 : 18,
                    borderBottomLeftRadius: isUser ? 18 : 4,
                    padding: 12,
                    border: isUser ? 'none' : '1px solid rgba(255,255,255,0.14)',
                    boxShadow: isUser
                      ? '0 6px 20px rgba(99,102,241,0.35)'
                      : '0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
                    backdropFilter: isUser ? 'none' : 'blur(12px)',
                    WebkitBackdropFilter: isUser ? 'none' : 'blur(12px)'
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
                  backgroundColor: 'rgba(129,140,248,0.20)',
                  border: '1px solid rgba(255,255,255,0.12)',
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
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 18,
                  borderBottomLeftRadius: 4,
                  padding: 14,
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
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
                backgroundColor: ERROR_BG,
                borderRadius: 12,
                padding: 12,
                marginBottom: 8,
                borderLeft: `3px solid ${ERROR}`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
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
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      borderRadius: 20,
                      padding: '8px 12px',
                      margin: 4,
                      border: '1px solid rgba(255,255,255,0.14)',
                      width: 'auto',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  >
                    <span style={{ color: '#A5B4FC', fontSize: 12, fontWeight: 600 }}>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(15,19,38,0.55)',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          padding: 12,
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.07)',
              borderRadius: 24,
              border: `1px solid ${inputText ? '#A5B4FC' : 'rgba(255,255,255,0.14)'}`,
              padding: '10px 16px',
              marginRight: 10,
              maxHeight: 100,
              overflowY: 'auto',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
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
              background: inputText.trim() ? PRIMARY_GRAD : 'rgba(255,255,255,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: inputText.trim() ? '0 6px 20px rgba(99,102,241,0.4)' : 'none'
            }}
          >
            <span style={{ fontSize: 18 }}>🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}
