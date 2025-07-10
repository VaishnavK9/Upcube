import { useState } from 'react';

export interface QuizState {
  selectedLanguage: string;
  quizStarted: boolean;
  currentQuestion: number;
  selectedAnswers: number[];
  quizCompleted: boolean;
  score: number;
  weakAreas: string[];
  saving: boolean;
  sessionId: string;
  questionStartTime: number;
}

export const useQuizState = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const resetQuiz = () => {
    setQuizStarted(false);
    setSelectedLanguage('');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setWeakAreas([]);
    setSessionId('');
  };

  const startQuiz = () => {
    if (selectedLanguage) {
      setQuizStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswers(new Array(35).fill(-1));
      setQuizCompleted(false);
      setQuestionStartTime(Date.now());
    }
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    quizStarted,
    setQuizStarted,
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
    startQuiz,
  };
};