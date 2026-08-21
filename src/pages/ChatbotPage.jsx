import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODELS = [
  import.meta.env.VITE_GROQ_MODEL,
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
].filter(Boolean);

const initialMessages = [
  {
    role: 'system',
    content:
      'You are CineBot, a Movie Assistant. You must ONLY answer questions related to movies, TV shows, actors, and cinema. If a user asks about anything else, politely decline and steer the conversation back to movies.',
  },
];

export const ChatbotPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setError(
        'Missing Groq API key. Please set VITE_GROQ_API_KEY in your .env file.',
      );
      return;
    }

    const userMessage = { role: 'user', content: trimmedInput };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputValue('');
    setError(null);
    setIsLoading(true);

    try {
      let resolvedReply = null;
      let lastErrorMessage = '';

      for (const model of GROQ_MODELS) {
        const response = await fetch(GROQ_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: updatedMessages,
            temperature: 0.4,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const apiErrorMessage =
            data?.error?.message ||
            `Groq request failed with status ${response.status}`;
          lastErrorMessage = apiErrorMessage;

          if (data?.error?.code === 'model_not_found') {
            continue;
          }

          throw new Error(apiErrorMessage);
        }

        resolvedReply = data?.choices?.[0]?.message?.content?.trim();
        if (resolvedReply) {
          break;
        }
      }

      if (!resolvedReply) {
        throw new Error(lastErrorMessage || 'No reply returned from Groq.');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: resolvedReply },
      ]);
    } catch (err) {
      const fallbackError =
        'Failed to connect to the movie assistant. Please try again.';
      setError(
        err instanceof Error && err.message ? err.message : fallbackError,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container chatbot-page">
      <h1 className="section-title">CineBot Assistant</h1>

      <div className="chatbot-shell">
        <div className="chatbot-messages" aria-live="polite">
          {messages
            .filter((message) => message.role !== 'system')
            .map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={`chatbot-message ${message.role === 'user' ? 'chatbot-message-user' : 'chatbot-message-assistant'}`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}

          {isLoading && (
            <div
              className="chatbot-message chatbot-message-assistant chatbot-loading-bubble"
              aria-label="Assistant is typing"
            >
              <span className="chatbot-dot" />
              <span className="chatbot-dot" />
              <span className="chatbot-dot" />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && <div className="chatbot-error">{error}</div>}

        <form className="chatbot-input-row" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about movies, actors, directors, or TV shows..."
            aria-label="Chat message"
          />
          <button type="submit" disabled={isLoading || !inputValue.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
