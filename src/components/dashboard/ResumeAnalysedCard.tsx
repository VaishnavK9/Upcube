
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, ArrowUp } from "lucide-react";

interface ResumeAnalysis {
  id: string;
  ats_score: number;
  suggestions: string[];
  filename: string;
  created_at: string;
}

interface ResumeAnalysedCardProps {
  analyses: ResumeAnalysis[];
  onClick: () => void;
}

const ResumeAnalysedCard = ({ analyses, onClick }: ResumeAnalysedCardProps) => {
  const total = analyses.length;
  const last = analyses[0];

  return (
    <Card
      className="transition-shadow hover:shadow-lg hover:scale-[1.01] cursor-pointer border flex flex-row items-center space-x-2 min-h-[110px] px-4 py-2 max-w-md"
      onClick={onClick}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
        <User size={20} className="text-green-700" />
      </div>
      <div className="flex-1">
        <CardHeader className="p-0 pb-1">
          <CardTitle className="flex items-center justify-between gap-1 text-base">
            Resume Analysed
            <span className="rounded bg-green-100 text-green-800 px-2 py-0.5 text-xs ml-auto">{total} times</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {last ? (
            <div>
              <div className="mb-0.5 text-gray-700 text-sm font-medium">{last.filename || "Unnamed"}</div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl font-bold">{last.ats_score}</span>
                <ArrowUp size={14} className="text-blue-600" />
                <span className="text-blue-700 text-xs">Latest</span>
              </div>
              <div className="text-xs text-gray-500">Analysed: {new Date(last.created_at).toLocaleDateString()}</div>
            </div>
          ) : (
            <div className="text-gray-400">No resume analysed yet.</div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ResumeAnalysedCard;
