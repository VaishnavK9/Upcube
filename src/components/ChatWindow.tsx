import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { chatService, ChatSession, ChatMessage as ChatMessageType } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';

interface ChatWindowProps {
  currentSession: ChatSession | null;
  onSessionUpdate?: (session: ChatSession) => void;
  showPrompt?: boolean;
}

const ChatWindow = ({ currentSession, onSessionUpdate, showPrompt }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [creatingSession, setCreatingSession] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const quickActions = [
    "Fix my resume",
    "Prepare for interview",
    "Suggest projects",
    "Code review tips",
    "Career guidance",
    "Technical skills to learn"
  ];

  useEffect(() => {
    if (currentSession) {
      loadChatMessages();
    } else {
      setMessages([]);
    }
  }, [currentSession]);

  useEffect(() => {
    // Scroll to the very latest message when messages or isTyping changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const loadChatMessages = async () => {
    if (!currentSession) return;
    try {
      const chatMessages = await chatService.getChatMessages(currentSession.id);
      setMessages(chatMessages);
      if (chatMessages.length === 0) {
        // Add welcome message for new chats
        const welcomeMessage: ChatMessageType = {
          id: 'welcome',
          user_id: user?.id || '',
          chat_session_id: currentSession.id,
          message: "Hello! I'm your AI mentor. I can help you with resume feedback, interview preparation, project suggestions, and career guidance. How can I assist you today?",
          sender: 'bot',
          created_at: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
      toast({
        title: "Error",
        description: "Failed to load chat messages",
        variant: "destructive"
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try to use your chatbot API through edge function
      const response = await fetch('/api/chatbot-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'career_guidance'
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.response;
      }
    } catch (error) {
      console.log('Chatbot API error, using fallback:', error);
    }

    // Fallback responses if API not available
    const message = userMessage.toLowerCase();
    
    if (message.includes('resume') || message.includes('cv')) {
      return "I'd be happy to help with your resume! Here are some key tips:\n\n• Use strong action verbs (achieved, developed, implemented)\n• Quantify your accomplishments with numbers\n• Tailor keywords to match job descriptions\n• Keep it concise and well-formatted\n• Include relevant technical skills\n\nWould you like me to review a specific section of your resume?";
    }
    
    if (message.includes('interview') || message.includes('preparation')) {
      return "Great! Interview preparation is crucial. Here's what I recommend:\n\n• Research the company and role thoroughly\n• Practice STAR method for behavioral questions\n• Prepare technical examples from your projects\n• Have questions ready about the team and culture\n• Practice coding problems if it's a technical role\n\nWhat type of interview are you preparing for?";
    }
    
    if (message.includes('project') || message.includes('portfolio')) {
      return "Building projects is excellent for skill development! Here are some ideas:\n\n• Web app with user authentication\n• Data analysis/visualization project\n• Mobile app solving a real problem\n• API integration project\n• Machine learning application\n• Open source contribution\n\nWhat technologies are you most interested in working with?";
    }
    
    return "I'm here to assist you with your career and technical development. How can I provide the most helpful guidance?";
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText || !user) return;

    setInputMessage('');
    setIsTyping(true);

    // If session does not exist, create it then send
    if (!currentSession) {
      try {
        setCreatingSession(true);
        // Create the chat session first (title as first 30 chars)
        const newSession = await chatService.createChatSession(user.id, messageText.slice(0, 30) + (messageText.length > 30 ? '...' : ''));
        onSessionUpdate?.(newSession);
        setCreatingSession(false);

        // Send the initial message in new session (simulate the full send like below)
        // Save user message
        const userMessage = await chatService.saveChatMessage(
          user.id,
          newSession.id,
          messageText,
          'user'
        );
        setMessages([userMessage]);

        // Generate/stream bot response
        setTimeout(async () => {
          const botResponse = await generateBotResponse(messageText);

          const tempBotMessage: ChatMessageType = {
            id: 'streaming',
            user_id: user.id,
            chat_session_id: newSession.id,
            message: botResponse,
            sender: 'bot',
            created_at: new Date().toISOString()
          };

          setStreamingMessageId('streaming');
          setMessages(prev => [...prev, tempBotMessage]);
          setIsTyping(false);

          setTimeout(async () => {
            try {
              const savedBotMessage = await chatService.saveChatMessage(
                user.id,
                newSession.id,
                botResponse,
                'bot'
              );
              setMessages(prev => prev.map(msg =>
                msg.id === 'streaming' ? savedBotMessage : msg
              ));
              setStreamingMessageId(null);
            } catch (error: any) {
              console.error('Error saving bot message:', error);
              toast({
                title: "Bot Message Error",
                description: error?.message ? error.message : String(error),
                variant: "destructive"
              });
            }
          }, botResponse.length * 20 + 1000);

        }, 1000 + Math.random() * 1000);

      } catch (error: any) {
        setIsTyping(false);
        setCreatingSession(false);
        toast({
          title: "Chat Error",
          description: error?.message ? error.message : String(error),
          variant: "destructive"
        });
      }
      return;
    }

    // Default: session exists, normal logic
    try {
      // Save user message
      const userMessage = await chatService.saveChatMessage(
        user.id,
        currentSession.id,
        messageText,
        'user'
      );

      setMessages(prev => [...prev, userMessage]);

      // Update session title if this is the first user message
      const isFirstMessage = messages.filter(m => m.sender === 'user').length === 0;
      if (isFirstMessage) {
        const title = messageText.slice(0, 30) + (messageText.length > 30 ? '...' : '');
        await chatService.updateChatSessionTitle(currentSession.id, title);
        onSessionUpdate?.({ ...currentSession, title });
      }

      // Generate and stream bot response
      setTimeout(async () => {
        const botResponse = await generateBotResponse(messageText);

        // Create a temporary message for streaming
        const tempBotMessage: ChatMessageType = {
          id: 'streaming',
          user_id: user.id,
          chat_session_id: currentSession.id,
          message: botResponse,
          sender: 'bot',
          created_at: new Date().toISOString()
        };

        setStreamingMessageId('streaming');
        setMessages(prev => [...prev, tempBotMessage]);
        setIsTyping(false);

        // After streaming is complete, save the actual message
        setTimeout(async () => {
          try {
            const savedBotMessage = await chatService.saveChatMessage(
              user.id,
              currentSession.id,
              botResponse,
              'bot'
            );

            setMessages(prev => prev.map(msg =>
              msg.id === 'streaming' ? savedBotMessage : msg
            ));
            setStreamingMessageId(null);
          } catch (error: any) {
            console.error('Error saving bot message:', error);
            toast({
              title: "Bot Message Error",
              description: error?.message ? error.message : String(error),
              variant: "destructive"
            });
          }
        }, botResponse.length * 20 + 1000);

      }, 1000 + Math.random() * 1000);

    } catch (error: any) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      toast({
        title: "Message Send Failed",
        description: error?.message ? error.message : String(error),
        variant: "destructive"
      });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentSession) {
    // Adjust container/flex styles to always keep input at the bottom
    return (
      <div className="flex flex-col flex-1 h-full min-h-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        {/* Main chat box area */}
        <div className="flex flex-1 items-center justify-center min-h-0">
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex flex-col items-center justify-center h-full min-h-[340px]">
              <div className="text-center animate-fade-in">
                <h3 className="text-3xl font-bold gradient-text mb-2">
                  Welcome to AI Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  Select a chat from the sidebar or{" "}
                  <span className="font-semibold text-upcube-blue">
                    start a new conversation
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Prompt area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message to start a new chat..."
                  disabled={isTyping || creatingSession}
                  className="min-h-[44px] resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping || creatingSession}
                size="icon"
                className="h-[44px] w-[44px] bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">{currentSession.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Career Mentor</p>
          </div>
        </div>
      </div>

      {/* Main content flex col: messages (scrollable) + prompt box (fixed) */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ScrollArea className="flex-1 px-4 py-4" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  sender={message.sender}
                  timestamp={message.created_at}
                  isStreaming={message.id === streamingMessageId}
                />
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl rounded-tl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {/* This is the anchor that will always be scrolled to */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Prompt/Input Area stays at bottom, never pushed! */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Message AI Career Mentor..."
                  disabled={isTyping}
                  className="min-h-[44px] resize-none border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="h-[44px] w-[44px] bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
