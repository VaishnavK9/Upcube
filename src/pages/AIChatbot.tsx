
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { chatService, ChatSession } from "@/services/chatService";

const AIChatbot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Remove autoSessionInitialized and the automatic selection effect

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleFocus = () => setRefreshKey((prev) => prev + 1);
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Remove auto-create/select session on load (only set currentSession if user interacts)

  const handleNewChat = async () => {
    if (!user) return;
    try {
      setCurrentSession(null); // Clear current session first for forced remount
      const newSession = await chatService.createChatSession(user.id);
      setCurrentSession(newSession);
      setSidebarOpen(false);
      setRefreshKey(prev => prev + 1);
      toast({
        title: "New chat created",
        description: "You can start chatting now!",
      });
    } catch (error) {
      console.error("Error creating new chat:", error);
      toast({
        title: "Error",
        description: "Failed to create new chat",
        variant: "destructive",
      });
    }
  };

  const handleSelectChat = (session: ChatSession) => {
    setCurrentSession(session);
    setSidebarOpen(false);
  };

  const handleSessionUpdate = (updatedSession: ChatSession) => {
    setCurrentSession(updatedSession);
    setRefreshKey((prev) => prev + 1);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl px-10 py-12 max-w-lg w-full mx-4 backdrop-blur-md border border-blue-100 dark:border-gray-800 flex flex-col items-center animate-fade-in">
            <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-700 dark:text-gray-200 font-medium">Loading your chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Full Screen Chat Layout with Sidebar */}
      <div className="fixed inset-0 top-[56px] flex flex-col min-h-0 z-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="hidden md:block min-w-[220px] max-w-[240px] h-full">
            <ChatSidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              onNewChat={handleNewChat}
              currentChatId={currentSession?.id}
              onSelectChat={handleSelectChat}
              refreshKey={refreshKey}
            />
          </div>
          {/* Vertical separator */}
          <div className="hidden md:block w-px bg-gradient-to-b from-blue-100 via-purple-100 to-transparent dark:from-gray-800 dark:via-gray-800 opacity-70" />
          {/* Main Chat area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* -- REMOVED AI Chatbot HEADER -- */}
            {/* Chat Messages + Prompt Area */}
            <div className="flex-1 flex flex-col min-h-0">
              <ChatWindow
                currentSession={currentSession}
                onSessionUpdate={handleSessionUpdate}
                showPrompt={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatbot;