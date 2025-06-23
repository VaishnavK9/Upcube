
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const APIGuide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integration Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Expected API Response Format:</strong></p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs">
{`{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": 0.85,
  "keyPhrases": ["programming", "javascript", "learning"],
  "topics": ["web development", "coding"],
  "difficulty": 0.6,
  "comprehension": 0.8
}`}
        </pre>
        <p className="mt-2">
          <strong>Supported NLP Services:</strong> OpenAI, Azure Cognitive Services, 
          Google Cloud Natural Language, AWS Comprehend, or any custom API following the above format.
        </p>
      </CardContent>
    </Card>
  );
};

export default APIGuide;
