import { useState } from 'react';
import { analyticsEngine, SkillAnalytics } from '@/services/analyticsService';
import { useAuth } from '@/contexts/AuthContext';

export const useQuizAnalytics = () => {
  const [analytics, setAnalytics] = useState<SkillAnalytics | null>(null);
  const { user } = useAuth();

  const startAnalyticsSession = (selectedLanguage: string): string => {
    const newSessionId = analyticsEngine.startSession(user?.id || 'anonymous', selectedLanguage);
    return newSessionId;
  };

  const processResponse = async (
    sessionId: string,
    question: any,
    answerIndex: number,
    timeSpent: number
  ) => {
    if (!sessionId || !question) return;

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
  };

  const finalizeSession = async (sessionId: string) => {
    if (!sessionId) return null;

    try {
      const finalAnalytics = await analyticsEngine.finalizeSession(sessionId);
      setAnalytics(finalAnalytics.overallAnalytics);
      return finalAnalytics;
    } catch (error) {
      console.error('Error finalizing analytics session:', error);
      return null;
    }
  };

  return {
    analytics,
    setAnalytics,
    startAnalyticsSession,
    processResponse,
    finalizeSession,
  };
};