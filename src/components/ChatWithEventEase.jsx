import React, { useState, useEffect, useRef } from "react";
import { askGemini } from "../utils/gemini";
import ReactMarkdown from "react-markdown";

const ChatWithEventEase = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "Suggest a wedding theme",
    "Birthday party ideas for a 6-year-old",
    "Give me budget planning tips",
    "Venue recommendations near me",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);

    const reply = await askGemini(input);

    setIsTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        from: "bot",
        text: "Hi there! I'm EventEase AI 👋\nNeed help with planning? Try asking about themes, venues, or party ideas!",
      },
    ]);
  }, []);

  return (
    <div className="fixed bottom-14 right-14 w-[90vw] max-w-[600px] h-[80vh] bg-white shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col border border-gray-200">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 flex justify-between items-center text-base font-semibold">
        <span>🤖 Ask EventEase</span>
        <button
          onClick={onClose}
          className="text-white hover:text-yellow-300 transition text-xl font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-sm scroll-smooth custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[90%] shadow-md whitespace-pre-wrap text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-yellow-200 text-black rounded-br-none"
                  : "bg-gray-50 text-gray-800 rounded-bl-none prose prose-sm"
              }`}
            >
              {msg.from === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl max-w-[90%] shadow-md bg-gray-50 text-gray-800">
              <span className="italic text-gray-500">Typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
        <h3 className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">
          💡 Suggested Questions
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(question);
                handleSend();
              }}
              className="text-sm bg-white hover:bg-yellow-100 text-gray-800 px-4 py-2 rounded-2xl transition shadow border border-gray-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="flex border-t border-gray-300 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about venues, services, themes..."
          className="flex-1 px-6 py-4 outline-none text-black placeholder-gray-500"
        />
        <button
          onClick={handleSend}
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-5 font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithEventEase;
