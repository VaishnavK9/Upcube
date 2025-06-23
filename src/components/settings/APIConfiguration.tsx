
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const APIConfiguration = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            API keys are now configured at the project level via Supabase Edge Function Secrets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Project-Level API Integration
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Your NLP and Chatbot APIs are configured at the project level through Supabase Edge Functions. 
              This ensures secure API key management and consistent functionality across all users.
            </p>
            <div className="mt-3 text-sm text-blue-600 dark:text-blue-400">
              <p>✓ NLP Analysis API configured</p>
              <p>✓ Chatbot Response API configured</p>
              <p>✓ Fallback functionality available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIConfiguration;
