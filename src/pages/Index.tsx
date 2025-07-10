
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const Index = () => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col pt-20">

        <Navbar />

        {/* Hero Section */}
        <section className="pt-16 pb-12 md:py-28 w-full bg-transparent px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto w-full text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-7">
              <span className="gradient-text">Upcube</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              AI-powered platform to analyze your coding skills, evaluate resumes, and get personalized career guidance
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  onClick={() => setShowLoginModal(true)}
                >
                  Get Started
                </Button>
                <Link to="/project-knowledge">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-transparent pb-16 px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-900/60 hover:scale-[1.015] transition-transform duration-300 flex flex-col">
              <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4 mx-auto mt-6">
                <span className="text-white text-xl">🧠</span>
              </div>
              <div className="text-center px-4 pb-8 flex-1 flex flex-col">
                <div className="text-xl font-semibold mb-2">Skill Assessment</div>
                <div className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-1">
                  Take comprehensive coding tests with 30-35 questions and get detailed analysis of your programming skills
                </div>
                <Link to="/skill-quiz" className="mt-auto">
                  <Button variant="outline" className="w-full">Start Quiz</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-900/60 hover:scale-[1.015] transition-transform duration-300 flex flex-col">
              <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4 mx-auto mt-6">
                <span className="text-white text-xl">📄</span>
              </div>
              <div className="text-center px-4 pb-8 flex-1 flex flex-col">
                <div className="text-xl font-semibold mb-2">Resume Analysis</div>
                <div className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-1">
                  Upload your resume for AI-powered analysis covering grammar, ATS compatibility, and improvement suggestions
                </div>
                <Link to="/resume-analyzer" className="mt-auto">
                  <Button variant="outline" className="w-full">Analyze Resume</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl shadow-lg border-0 bg-white/80 dark:bg-gray-900/60 hover:scale-[1.015] transition-transform duration-300 flex flex-col">
              <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4 mx-auto mt-6">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div className="text-center px-4 pb-8 flex-1 flex flex-col">
                <div className="text-xl font-semibold mb-2">AI Career Guide</div>
                <div className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-1">
                  Get personalized career advice, skill improvement suggestions, and tech role guidance from our AI mentor
                </div>
                <Link to="/ai-chatbot" className="mt-auto">
                  <Button variant="outline" className="w-full">Chat with AI</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full my-0 py-0 px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-4 gap-8 bg-white dark:bg-gray-800/80 rounded-2xl shadow-lg px-4 py-10 md:py-12 mb-14">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Assessments Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Programming Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">AI Support</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-none mt-0 py-14 px-4 sm:px-8 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your Skills?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of developers improving their careers with Upcube</p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                variant="secondary" 
                className="px-8 py-4 text-lg"
                onClick={() => setShowLoginModal(true)}
              >
                Start Your Journey
              </Button>
            )}
          </div>
        </section>
      </div>

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default Index;