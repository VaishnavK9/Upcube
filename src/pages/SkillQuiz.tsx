import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { generateCertificate } from '@/utils/certificateGenerator';
import { useToast } from '@/hooks/use-toast';
import QuizStartSection from '@/components/skill-quiz/QuizStartSection';
import QuizQuestionsSection from '@/components/skill-quiz/QuizQuestionsSection';
import QuizResultSection from '@/components/skill-quiz/QuizResultSection';
import { Button } from '@/components/ui/button';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { useQuizAnalytics } from '@/hooks/useQuizAnalytics';
import { calculateQuizScore, saveQuizResult, getQuestionsForLanguage } from '@/utils/quizHelpers';

const SkillQuiz = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  const {
    selectedLanguage,
    setSelectedLanguage,
    quizStarted,
    currentQuestion,
    setCurrentQuestion,
    selectedAnswers,
    setSelectedAnswers,
    quizCompleted,
    setQuizCompleted,
    score,
    setScore,
    weakAreas,
    setWeakAreas,
    saving,
    setSaving,
    sessionId,
    setSessionId,
    questionStartTime,
    setQuestionStartTime,
    resetQuiz,
    startQuiz: baseStartQuiz,
  } = useQuizState();

  const { analytics, startAnalyticsSession, processResponse, finalizeSession } = useQuizAnalytics();
  
  const currentQuestions = getQuestionsForLanguage(selectedLanguage);
  
  const completeQuiz = async () => {
    if (!sessionId) {
      const { score: calculatedScore, weakAreas: calculatedWeakAreas } = calculateQuizScore(selectedAnswers, currentQuestions);
      setScore(calculatedScore);
      setWeakAreas(calculatedWeakAreas);
      setQuizCompleted(true);
      return;
    }

    try {
      const finalAnalytics = await finalizeSession(sessionId);
      if (finalAnalytics) {
        setScore(finalAnalytics.finalScore);
        setWeakAreas(finalAnalytics.overallAnalytics.weakAreas);
        setQuizCompleted(true);

        if (user && profile) {
          setSaving(true);
          try {
            await saveQuizResult(
              profile.id,
              selectedLanguage,
              finalAnalytics.finalScore,
              finalAnalytics.overallAnalytics.weakAreas,
              currentQuestions.length
            );
            
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

  const { timeLeft } = useQuizTimer(quizStarted, quizCompleted, completeQuiz);

  const startQuiz = () => {
    baseStartQuiz();
    const newSessionId = startAnalyticsSession(selectedLanguage);
    setSessionId(newSessionId);
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (sessionId && currentQuestions[currentQuestion]) {
      const timeSpent = Date.now() - questionStartTime;
      const question = currentQuestions[currentQuestion];
      
      await processResponse(sessionId, question, answerIndex, timeSpent);
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

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full pt-20">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full pt-20">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full pt-20">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 w-full pt-20">
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
        </div>
      </main>
    </div>
  );
};

export default SkillQuiz;