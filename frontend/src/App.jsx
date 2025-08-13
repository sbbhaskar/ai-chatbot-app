import React, { useEffect, useRef, useState } from 'react';
import { sendChat } from './api';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'assistant', content: 'Namaste! Ask me anything 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const chatMessages = messages.filter(m => m.role !== 'system');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length, loading]);

  const onSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      // Include system + all prior messages for simple history
      const res = await sendChat(next);
      const reply = res.reply || '…';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I hit an error talking to the AI.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <h1>AI Chatbot</h1>
      </header>

      <main className="chat">
        {chatMessages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            <div className="sender">{m.role === 'user' ? 'You' : 'Bot'}</div>
            <div className="content">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="bubble assistant">
            <div className="sender">Bot</div>
            <div className="content">Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <form className="composer" onSubmit={onSend}>
        <input
          placeholder="Type your message and hit Enter…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button disabled={loading || !input.trim()}>{loading ? '...' : 'Send'}</button>
      </form>

      <footer className="foot">
        <small>Built with ❤️ by Bhaskar + Guru</small>
      </footer>
    </div>
  );
}
