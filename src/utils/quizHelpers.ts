import { quizQuestions } from '@/data/quizQuestions';
import { saveSkillResult } from '@/services/supabaseService';

export const calculateQuizScore = (
  selectedAnswers: number[],
  questions: any[]
): { score: number; weakAreas: string[] } => {
  let correctCount = 0;
  const incorrectCategories: string[] = [];

  selectedAnswers.forEach((answer, index) => {
    if (questions[index] && answer === questions[index].correct) {
      correctCount++;
    } else if (questions[index]) {
      incorrectCategories.push(questions[index].category);
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const weakAreas = [...new Set(incorrectCategories)].slice(0, 5);

  return { score, weakAreas };
};

export const saveQuizResult = async (
  userId: string,
  language: string,
  score: number,
  weakAreas: string[],
  totalQuestions: number
) => {
  return await saveSkillResult({
    user_id: userId,
    language,
    score,
    weak_areas: weakAreas,
    total_questions: totalQuestions
  });
};

export const getQuestionsForLanguage = (language: string) => {
  return language ? quizQuestions[language] || [] : [];
};