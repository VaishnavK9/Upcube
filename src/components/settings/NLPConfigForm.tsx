
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface NLPConfigFormProps {
  config: {
    nlpApiKey: string;
    nlpEndpoint: string;
  };
  isLoading: boolean;
  onConfigChange: (field: string, value: string) => void;
  onSave: () => void;
  onTest: () => void;
}

const NLPConfigForm: React.FC<NLPConfigFormProps> = ({
  config,
  isLoading,
  onConfigChange,
  onSave,
  onTest
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NLP API Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nlp-api-key">NLP API Key</Label>
          <Input
            id="nlp-api-key"
            type="password"
            placeholder="Enter your NLP service API key..."
            value={config.nlpApiKey}
            onChange={(e) => onConfigChange('nlpApiKey', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nlp-endpoint">API Endpoint</Label>
          <Input
            id="nlp-endpoint"
            placeholder="https://api.your-nlp-service.com/analyze"
            value={config.nlpEndpoint}
            onChange={(e) => onConfigChange('nlpEndpoint', e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={onSave} variant="default">
            Save Configuration
          </Button>
          <Button 
            onClick={onTest} 
            variant="outline" 
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Test API'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NLPConfigForm;
