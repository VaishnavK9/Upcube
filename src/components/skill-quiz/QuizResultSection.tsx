
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { SkillAnalytics } from '@/services/analyticsService';

interface QuizResultSectionProps {
  selectedLanguage: string;
  score: number;
  currentQuestions: any[];
  selectedAnswers: number[];
  weakAreas: string[];
  user: any;
  profile: any;
  saving: boolean;
  analytics?: SkillAnalytics | null;
  onResetQuiz: () => void;
  onDownloadCertificate: () => void;
}

const QuizResultSection: React.FC<QuizResultSectionProps> = ({
  selectedLanguage,
  score,
  currentQuestions,
  selectedAnswers,
  weakAreas,
  user,
  profile,
  saving,
  analytics,
  onResetQuiz,
  onDownloadCertificate,
}) => (
  <div className="space-y-6">
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl gradient-text">Quiz Completed! 🎉</CardTitle>
        <CardDescription>Here are your results for {selectedLanguage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-4xl font-bold gradient-text mb-2">{score}%</div>
          <div className="text-gray-600 dark:text-gray-400">
            {selectedAnswers.filter((answer, index) => answer === currentQuestions[index]?.correct).length} out of {currentQuestions.length} correct
          </div>
        </div>
        <Progress value={score} className="h-4" />
        
        {!user && (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Login to save your results</strong> and access detailed analytics!
            </p>
          </div>
        )}
      </CardContent>
    </Card>

    {analytics && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="text-purple-600" size={20} />
            Advanced Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analytics.bktScore}%</div>
              <div className="text-sm text-blue-800 dark:text-blue-200">Knowledge Score</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600">{analytics.masteryLevel}</div>
              <div className="text-sm text-green-800 dark:text-green-200">Mastery Level</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analytics.learningVelocity}%</div>
              <div className="text-sm text-purple-800 dark:text-purple-200">Learning Rate</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{analytics.retentionRate}%</div>
              <div className="text-sm text-orange-800 dark:text-orange-200">Retention</div>
            </div>
          </div>

          {analytics.nlpInsights && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Lightbulb size={16} />
                Performance Insights
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Assessment Result:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    analytics.nlpInsights.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    analytics.nlpInsights.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {analytics.nlpInsights.sentiment === 'positive' ? 'Excellent' : 
                     analytics.nlpInsights.sentiment === 'negative' ? 'Needs Work' : 'Good'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Confidence:</span>
                  <span className="ml-2">{Math.round(analytics.nlpInsights.confidence * 100)}%</span>
                </div>
              </div>
              {analytics.nlpInsights.keyPhrases.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium text-sm">Key Topics:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analytics.nlpInsights.keyPhrases.slice(0, 5).map((phrase, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )}

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} />
          Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
              <Target size={16} />
              Strengths
            </h4>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• Overall Score: {score}%</li>
              {analytics?.bktScore && <li>• Knowledge Score: {analytics.bktScore}%</li>}
              {analytics?.strongAreas.length > 0 ? (
                analytics.strongAreas.map((area, index) => (
                  <li key={index}>• Strong in {area}</li>
                ))
              ) : (
                <li>• Questions answered correctly</li>
              )}
              {analytics?.masteryLevel === 'Expert' && <li>• Expert-level performance</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-amber-700 dark:text-amber-300 mb-3">Areas to Improve</h4>
            <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
              {analytics?.weakAreas.length > 0 ? (
                analytics.weakAreas.map((area, index) => (
                  <li key={index}>• Focus on {area}</li>
                ))
              ) : weakAreas.length > 0 ? (
                weakAreas.map((area, index) => (
                  <li key={index}>• {area}</li>
                ))
              ) : (
                <li>• Excellent performance!</li>
              )}
            </ul>
          </div>
        </div>

        {analytics?.recommendations && analytics.recommendations.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Personalized Recommendations
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              {analytics.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>

    <div className="flex space-x-4">
      <Button onClick={onResetQuiz} variant="outline" className="flex-1">
        Take Another Quiz
      </Button>
      {user && profile && (
        <Button
          onClick={onDownloadCertificate}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Download Certificate
        </Button>
      )}
    </div>
    
    {saving && (
      <div className="text-center text-sm text-gray-500">
        Saving your results...
      </div>
    )}
  </div>
);

export default QuizResultSection;
