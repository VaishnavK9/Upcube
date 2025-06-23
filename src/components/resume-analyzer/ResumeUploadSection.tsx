
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';

interface ResumeUploadSectionProps {
  file: File | null;
  dragActive: boolean;
  analyzing: boolean;
  uploading: boolean;
  user: any;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onAnalyzeResume: () => void;
}

const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({
  file,
  dragActive,
  analyzing,
  uploading,
  user,
  onFileUpload,
  onDrop,
  onDragOver,
  onDragLeave,
  onAnalyzeResume,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="h-5 w-5" />
        Upload Your Resume
      </CardTitle>
      <CardDescription>
        Upload your resume in PDF format for comprehensive AI analysis including ATS compatibility and grammar checking
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="space-y-4">
          <div className="text-4xl">📄</div>
          <div>
            <label htmlFor="resume-upload" className="cursor-pointer">
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={onFileUpload}
                className="hidden"
              />
              <Button variant="outline" className="mb-2 flex items-center gap-2">
                <Upload size={16} />
                Choose PDF File
              </Button>
            </label>
            <p className="text-sm text-gray-500">or drag and drop your resume here</p>
            <p className="text-xs text-gray-400 mt-1">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      {file && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  {file.name}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                </p>
              </div>
            </div>
            <Button
              onClick={onAnalyzeResume}
              disabled={analyzing}
              className="bg-green-600 hover:bg-green-700"
            >
              {uploading ? 'Uploading...' : analyzing ? 'Analyzing...' : 'Start Analysis'}
            </Button>
          </div>
        </div>
      )}

      {!user && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-amber-800 dark:text-amber-200 text-center">
            <strong>Login to save your analysis</strong> to your dashboard for future reference!
          </p>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Enhanced Analysis Includes:</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700 dark:text-blue-300">
          <div className="space-y-1">
            <p className="font-medium">🤖 ATS Scanning:</p>
            <ul className="space-y-1 ml-4">
              <li>• Keyword optimization</li>
              <li>• Format compatibility</li>
              <li>• Section structure analysis</li>
            </ul>
          </div>
          <div className="space-y-1">
            <p className="font-medium">📝 Grammar & Style:</p>
            <ul className="space-y-1 ml-4">
              <li>• Grammar and spelling check</li>
              <li>• Writing clarity analysis</li>
              <li>• Professional tone assessment</li>
            </ul>
          </div>
        </div>
      </div>

      {analyzing && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">
            {uploading ? 'Uploading resume...' : 'Performing comprehensive analysis...'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {uploading
              ? 'Securing your file...'
              : 'Checking ATS compatibility, grammar, and optimization opportunities'}
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

export default ResumeUploadSection;
