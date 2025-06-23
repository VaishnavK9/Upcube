import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Plus, Menu, Trash2, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { chatService, ChatSession } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  currentChatId?: string;
  onSelectChat: (chatSession: ChatSession) => void;
  refreshKey?: number; // NEW: for triggering reload
}

const ChatSidebar = ({ isOpen, onToggle, onNewChat, currentChatId, onSelectChat, refreshKey }: ChatSidebarProps) => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadChatSessions();
    } else {
      setChatSessions([]); // Clear sidebar if logged out
    }
    // Also refetch when refreshKey changes (tab change, reload, new chat, etc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshKey]); // always re-run when user or refresh-key changes

  const loadChatSessions = async () => {
    if (!user) {
      setChatSessions([]); // Clear if no user
      return;
    }

    try {
      const sessions = await chatService.getUserChatSessions(user.id);
      setChatSessions(sessions);
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      toast({
        title: "Error",
        description: "Failed to load chat sessions",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await chatService.deleteChatSession(sessionId);
      setChatSessions(prev => prev.filter(s => s.id !== sessionId));

      toast({
        title: "Success",
        description: "Chat session deleted"
      });
    } catch (error) {
      console.error('Error deleting chat session:', error);
      toast({
        title: "Error",
        description: "Failed to delete chat session",
        variant: "destructive"
      });
    }
  };

  const handleEditTitle = async (sessionId: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    try {
      await chatService.updateChatSessionTitle(sessionId, newTitle);
      setChatSessions(prev => prev.map(s =>
        s.id === sessionId ? { ...s, title: newTitle } : s
      ));
      setEditingId(null);

      toast({
        title: "Success",
        description: "Chat title updated"
      });
    } catch (error) {
      console.error('Error updating chat title:', error);
      toast({
        title: "Error",
        description: "Failed to update chat title",
        variant: "destructive"
      });
    }
  };

  const startEditing = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-white">Chats</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="lg:hidden"
              >
                <Menu size={20} />
              </Button>
            </div>
            <Button
              onClick={onNewChat}
              className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
            >
              <Plus size={16} className="mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat Sessions */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {chatSessions.length > 0 ? (
                chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group relative rounded-lg transition-colors ${
                      currentChatId === session.id ? 'bg-blue-100 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => onSelectChat(session)}
                      className="w-full justify-start text-left h-auto p-3"
                    >
                      <div className="flex items-start gap-3 w-full">
                        <MessageSquare size={16} className="mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          {editingId === session.id ? (
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onBlur={() => handleEditTitle(session.id, editTitle)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleEditTitle(session.id, editTitle);
                                }
                              }}
                              className="w-full bg-transparent border-none outline-none text-sm font-medium"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <p className="font-medium text-sm truncate">
                              {session.title}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                            {new Date(session.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Button>

                    {/* Action buttons */}
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => startEditing(session, e)}
                      >
                        <Edit size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={(e) => handleDeleteSession(session.id, e)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                  <p className="text-xs">Start a new chat to begin</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              AI Career Mentor
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button for mobile when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="fixed top-4 left-4 z-40 lg:hidden bg-white dark:bg-gray-800 shadow-md"
        >
          <Menu size={20} />
        </Button>
      )}
    </>
  );
};

export default ChatSidebar;
