import React, { useState, useEffect } from 'react';

const messages = [
  "Weaving the threads of time...",
  "Reuniting your past and present...",
  "Crafting your nostalgic moment...",
  "Painting your memory with AI...",
  "Asking the past to hug the present...",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-300">
      <div className="w-12 h-12 border-4 border-t-cyan-400 border-slate-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium animate-pulse">{message}</p>
    </div>
  );
};
