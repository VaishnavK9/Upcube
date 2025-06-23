
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { quizQuestions } from '@/data/quizQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { saveSkillResult } from '@/services/supabaseService';
import { generateCertificate } from '@/utils/certificateGenerator';
import { useToast } from '@/hooks/use-toast';
import { analyticsEngine, SkillAnalytics } from '@/services/analyticsService';
import QuizStartSection from '@/components/skill-quiz/QuizStartSection';
import QuizQuestionsSection from '@/components/skill-quiz/QuizQuestionsSection';
import QuizResultSection from '@/components/skill-quiz/QuizResultSection';
import { Button } from '@/components/ui/button';

const SkillQuiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(900);
  const [saving, setSaving] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [analytics, setAnalytics] = useState<SkillAnalytics | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const { user, profile } = useAuth();
  const { toast } = useToast();
  const currentQuestions = selectedLanguage ? quizQuestions[selectedLanguage] || [] : [];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            completeQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizCompleted, timeLeft]);

  const startQuiz = () => {
    if (selectedLanguage && quizQuestions[selectedLanguage]) {
      setQuizStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswers(new Array(35).fill(-1));
      setQuizCompleted(false);
      setTimeLeft(900);
      setQuestionStartTime(Date.now());
      
      const newSessionId = analyticsEngine.startSession(user?.id || 'anonymous', selectedLanguage);
      setSessionId(newSessionId);
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (sessionId && currentQuestions[currentQuestion]) {
      const timeSpent = Date.now() - questionStartTime;
      const question = currentQuestions[currentQuestion];
      
      try {
        const currentAnalytics = await analyticsEngine.processResponse(sessionId, {
          question: question.question,
          userAnswer: question.options[answerIndex],
          correctAnswer: question.options[question.correct],
          skillArea: question.category,
          timeSpent: timeSpent / 1000,
          difficulty: 0.5
        });
        
        setAnalytics(currentAnalytics);
      } catch (error) {
        console.error('Analytics processing error:', error);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    if (!sessionId) {
      let correctCount = 0;
      const incorrectCategories: string[] = [];
      selectedAnswers.forEach((answer, index) => {
        if (currentQuestions[index] && answer === currentQuestions[index].correct) {
          correctCount++;
        } else if (currentQuestions[index]) {
          incorrectCategories.push(currentQuestions[index].category);
        }
      });
      const finalScore = Math.round((correctCount / currentQuestions.length) * 100);
      setScore(finalScore);
      setWeakAreas([...new Set(incorrectCategories)].slice(0, 5));
      setQuizCompleted(true);
      return;
    }

    try {
      const finalAnalytics = await analyticsEngine.finalizeSession(sessionId);
      setScore(finalAnalytics.finalScore);
      setAnalytics(finalAnalytics.overallAnalytics);
      setWeakAreas(finalAnalytics.overallAnalytics.weakAreas);
      setQuizCompleted(true);

      if (user && profile) {
        setSaving(true);
        try {
          await saveSkillResult({
            user_id: profile.id,
            language: selectedLanguage,
            score: finalAnalytics.finalScore,
            weak_areas: finalAnalytics.overallAnalytics.weakAreas,
            total_questions: currentQuestions.length
          });
          
          toast({
            title: "Results Saved!",
            description: "Your quiz results have been saved to your dashboard."
          });
        } catch (error) {
          console.error('Error saving skill result:', error);
          toast({
            title: "Save Failed",
            description: "Could not save your results. Please try again.",
            variant: "destructive"
          });
        } finally {
          setSaving(false);
        }
      }
    } catch (error) {
      console.error('Error completing quiz:', error);
      toast({
        title: "Processing Error",
        description: "Quiz completed but result processing failed.",
        variant: "destructive"
      });
      setQuizCompleted(true);
    }
  };

  const handleDownloadCertificate = () => {
    if (profile) {
      generateCertificate({
        userName: profile.name,
        language: selectedLanguage,
        score: score,
        date: new Date().toLocaleDateString()
      });
      toast({
        title: "Certificate Downloaded!",
        description: "Your certificate has been generated and downloaded."
      });
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedLanguage('');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setWeakAreas([]);
    setTimeLeft(900);
    setSessionId('');
    setAnalytics(null);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full">
        <Navbar />
        <main className="py-8">
          <div className="max-w-3xl mx-auto px-4">
            <QuizResultSection
              selectedLanguage={selectedLanguage}
              score={score}
              currentQuestions={currentQuestions}
              selectedAnswers={selectedAnswers}
              weakAreas={weakAreas}
              user={user}
              profile={profile}
              saving={saving}
              analytics={analytics}
              onResetQuiz={resetQuiz}
              onDownloadCertificate={handleDownloadCertificate}
            />
          </div>
        </main>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full">
        <Navbar />
        <main className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuizStartSection
              selectedLanguage={selectedLanguage}
              onSelectedLanguage={setSelectedLanguage}
              onStartQuiz={startQuiz}
            />
          </div>
        </main>
      </div>
    );
  }

  if (!currentQuestions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full">
        <Navbar />
        <main className="py-8">
          <div className="max-w-xl mx-auto px-4">
            <div className="text-center py-16">
              <p>Questions for {selectedLanguage} are not available yet.</p>
              <Button onClick={resetQuiz} className="mt-4">
                Choose Another Language
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full">
      <Navbar />
      <main className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <QuizQuestionsSection
            selectedLanguage={selectedLanguage}
            currentQuestion={currentQuestion}
            currentQuestions={currentQuestions}
            selectedAnswers={selectedAnswers}
            onAnswerSelect={handleAnswerSelect}
            onPrev={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            onNext={nextQuestion}
            timeLeft={timeLeft}
          />
          
          {/* COMMENTED OUT: Live Progress Analytics Section
          {analytics && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Live Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 dark:text-blue-400">Knowledge:</span>
                  <div className="font-bold">{analytics.bktScore}%</div>
                </div>
                <div>
                  <span className="text-blue-600 dark:text-blue-400">Level:</span>
                  <div className="font-bold">{analytics.masteryLevel}</div>
                </div>
                <div>
                  <span className="text-blue-600 dark:text-blue-400">Learning:</span>
                  <div className="font-bold">{analytics.learningVelocity}%</div>
                </div>
                <div>
                  <span className="text-blue-600 dark:text-blue-400">Retention:</span>
                  <div className="font-bold">{analytics.retentionRate}%</div>
                </div>
              </div>
            </div>
          )}
          */}
        </div>
      </main>
    </div>
  );
};

export default SkillQuiz;
