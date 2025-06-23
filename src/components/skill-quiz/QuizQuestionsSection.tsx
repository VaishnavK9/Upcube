
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface QuizQuestionsSectionProps {
  selectedLanguage: string;
  currentQuestion: number;
  currentQuestions: any[];
  selectedAnswers: number[];
  onAnswerSelect: (answerIndex: number) => void;
  onPrev: () => void;
  onNext: () => void;
  timeLeft: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const QuizQuestionsSection: React.FC<QuizQuestionsSectionProps> = ({
  selectedLanguage,
  currentQuestion,
  currentQuestions,
  selectedAnswers,
  onAnswerSelect,
  onPrev,
  onNext,
  timeLeft,
}) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>{selectedLanguage} Assessment</CardTitle>
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              timeLeft <= 300
                ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                : timeLeft <= 600
                ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
            }`}
          >
            <Clock size={16} />
            <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
          </div>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {currentQuestions.length}
          </span>
        </div>
      </div>
      <Progress value={((currentQuestion + 1) / currentQuestions.length) * 100} className="h-2" />
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <div className="mb-2">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
            {currentQuestions[currentQuestion]?.category}
          </span>
        </div>
        <h3 className="text-lg font-medium mb-4">
          {currentQuestions[currentQuestion]?.question}
        </h3>
        <div className="space-y-3">
          {currentQuestions[currentQuestion]?.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedAnswers[currentQuestion] === -1}
        >
          {currentQuestion === currentQuestions.length - 1 ? 'Complete Quiz' : 'Next Question'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default QuizQuestionsSection;
