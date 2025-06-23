
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { quizQuestions, programmingLanguages } from '@/data/quizQuestions';

interface QuizStartSectionProps {
  selectedLanguage: string;
  onSelectedLanguage: (lang: string) => void;
  onStartQuiz: () => void;
}

const QuizStartSection: React.FC<QuizStartSectionProps> = ({
  selectedLanguage,
  onSelectedLanguage,
  onStartQuiz,
}) => (
  <div className="w-full">
    {/* <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Skill Assessment Test</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Choose a programming language and test your knowledge with 35 comprehensive questions
      </p>
    </div> */}

    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <label className="text-lg font-semibold mb-4 block text-center">Select Programming Language</label>
        <Select value={selectedLanguage} onValueChange={onSelectedLanguage}>
          <SelectTrigger className="h-14 text-lg">
            <SelectValue placeholder="Choose a language..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {programmingLanguages.map((lang) => (
              <SelectItem key={lang} value={lang} className="hover:bg-gray-100 dark:hover:bg-gray-700 text-lg py-3">
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4 text-center">What to Expect:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="text-blue-700 dark:text-blue-300 space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              35 questions covering all skill areas
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <strong>15 minutes time limit</strong>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Syntax, loops, functions, OOP concepts
            </li>
          </ul>
          <ul className="text-blue-700 dark:text-blue-300 space-y-3">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Advanced performance analysis
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Detailed knowledge report
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Downloadable certificate upon completion
            </li>
          </ul>
        </div>
      </div>

      <Button
        onClick={onStartQuiz}
        disabled={!selectedLanguage || !quizQuestions[selectedLanguage]}
        className="w-full py-8 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        Start Assessment Test
      </Button>
    </div>
  </div>
);

export default QuizStartSection;
