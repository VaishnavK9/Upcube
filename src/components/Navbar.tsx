
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import LoginModal from './LoginModal';
import { useState } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Updated navbar links logic - removed Knowledge tab for logged out users
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/skill-quiz', label: 'Skill Assessment' },
    { to: '/resume-analyzer', label: 'Resume Analysis' },
    { to: '/project-ideas', label: 'Project Ideas' },
    // Show AI Chatbot and Dashboard ONLY for logged in users
    ...(user
      ? [
          { to: '/ai-chatbot', label: 'AI Chatbot' },
          { to: '/dashboard', label: 'Dashboard' },
        ]
      : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className={user ? "fixed top-0 left-0 right-0 z-50" : "fixed top-4 left-4 right-4 z-50"}>
        <nav className={
          user 
            ? "bg-background border-b border-border shadow-sm"
            : "bg-white/10 dark:bg-gray-900/20 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-700/30 rounded-2xl max-w-7xl mx-auto"
        }>
          <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UC</span>
                </div>
                <span className="text-xl font-bold gradient-text hidden sm:block">Upcube</span>
                <span className="text-lg font-bold gradient-text sm:hidden">UC</span>
              </Link>
            </div>

            {/* Navigation Links - Always Visible */}
            <div className="flex items-center space-x-1 md:space-x-3 flex-1 justify-center overflow-x-auto">
              <div className="flex items-center space-x-1 md:space-x-3 min-w-max">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                     className={`px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                       isActive(link.to)
                         ? 'bg-primary text-white'
                         : user
                           ? 'text-foreground hover:text-primary hover:bg-accent'
                           : 'text-gray-900 dark:text-gray-200 hover:text-gray-700 hover:bg-white/20 dark:hover:bg-white/10 dark:hover:text-white'
                     }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right Side Controls */}
            <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={user 
                  ? "p-2 rounded-lg hover:bg-accent transition-colors"
                  : "p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                }
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className={user ? "w-4 h-4 md:w-5 md:h-5 text-foreground" : "w-4 h-4 md:w-5 md:h-5 text-white/90"} />
                ) : (
                  <Sun className={user ? "w-4 h-4 md:w-5 md:h-5 text-foreground" : "w-4 h-4 md:w-5 md:h-5 text-white/90"} />
                )}
              </button>

              {/* User Menu or Login */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1 md:space-x-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs md:text-sm">{profile?.name || user.email}</span>
                      <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowLoginModal(true)} size="sm" className="text-xs md:text-sm">
                  Login
                </Button>
              )}
            </div>
            </div>
          </div>
        </nav>
      </div>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Navbar;