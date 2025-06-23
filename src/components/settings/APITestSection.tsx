
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface APITestSectionProps {
  testText: string;
  testResult: any;
  onTestTextChange: (value: string) => void;
}

const APITestSection: React.FC<APITestSectionProps> = ({
  testText,
  testResult,
  onTestTextChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-text">Test Text</Label>
          <Textarea
            id="test-text"
            placeholder="Enter text to test NLP analysis..."
            value={testText}
            onChange={(e) => onTestTextChange(e.target.value)}
            rows={3}
          />
        </div>

        {testResult && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Test Result:</h4>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default APITestSection;
