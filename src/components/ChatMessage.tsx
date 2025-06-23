
import { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp?: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ message, sender, timestamp, isStreaming = false }: ChatMessageProps) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isStreaming && sender === 'bot') {
      setIsTyping(true);
      setDisplayedMessage('');
      
      let i = 0;
      const typeWriter = () => {
        if (i < message.length) {
          setDisplayedMessage(prev => prev + message.charAt(i));
          i++;
          setTimeout(typeWriter, 20);
        } else {
          setIsTyping(false);
        }
      };
      
      setTimeout(typeWriter, 500);
    } else {
      setDisplayedMessage(message);
      setIsTyping(false);
    }
  }, [message, isStreaming, sender]);

  return (
    <div className={`flex gap-4 ${sender === 'user' ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        sender === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 dark:bg-gray-700'
      }`}>
        {sender === 'user' ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className={`max-w-[80%] ${sender === 'user' ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-4 rounded-2xl ${
          sender === 'user'
            ? 'bg-blue-500 text-white rounded-tr-md'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-md'
        }`}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {displayedMessage}
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
            )}
          </p>
        </div>
        
        {timestamp && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
