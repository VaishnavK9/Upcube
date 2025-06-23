
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScoreCard from './ScoreCard';
import { AlertCircle } from 'lucide-react';

interface ResumeResultSectionProps {
  results: any;
  user: any;
  onNewAnalysis: () => void;
  onDownloadReport: () => void;
  onViewInDashboard: () => void;
}

const ResumeResultSection: React.FC<ResumeResultSectionProps> = ({
  results,
  user,
  onNewAnalysis,
  onDownloadReport,
  onViewInDashboard,
}) => (
  <div className="space-y-6">
    {/* Overall Score */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Analysis Results
          <Button variant="outline" onClick={onNewAnalysis}>
            Analyze New Resume
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <ScoreCard title="Overall Score" score={results.overallScore} color="text-blue-600" />
          <ScoreCard title="ATS Compatible" score={results.atsCompatibility} color="text-green-600" />
          <ScoreCard title="Grammar" score={results.grammarScore} color="text-purple-600" />
          <ScoreCard title="Formatting" score={results.formattingScore} color="text-orange-600" />
        </div>
      </CardContent>
    </Card>
    {/* ATS Issues */}
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          ATS Compatibility Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {results.atsIssues.map((issue: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 mr-2">⚠</span>
              <span className="text-sm">{issue}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
    {/* Grammar Issues */}
    <Card>
      <CardHeader>
        <CardTitle className="text-orange-700 dark:text-orange-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Grammar & Style Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {results.grammarIssues.map((issue: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-orange-500 mr-2">📝</span>
              <span className="text-sm">{issue}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
    {/* Detailed Analysis */}
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-300">Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-amber-700 dark:text-amber-300">Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.improvements.map((improvement: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-2">⚠</span>
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
    {/* Suggestions */}
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>
          Specific suggestions to improve your resume's ATS compatibility and readability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.suggestions.map((suggestion: string, index: number) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">💡</span>
                <span className="text-sm">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    {/* Action Buttons */}
    <div className="flex space-x-4">
      <Button onClick={onDownloadReport} className="flex-1">
        Download Detailed Report
      </Button>
      {user && (
        <Button variant="outline" onClick={onViewInDashboard} className="flex-1">
          View in Dashboard
        </Button>
      )}
    </div>
  </div>
);

export default ResumeResultSection;
