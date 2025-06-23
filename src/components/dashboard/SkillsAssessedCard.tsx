
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, ArrowUp } from "lucide-react";

interface SkillResult {
  id: string;
  language: string;
  score: number;
  weak_areas: string[];
  total_questions: number;
  created_at: string;
}

interface SkillsAssessedCardProps {
  results: SkillResult[];
  onClick: () => void;
}

const SkillsAssessedCard = ({ results, onClick }: SkillsAssessedCardProps) => {
  const total = results.length;
  const last = results[0];

  return (
    <Card
      className="transition-shadow hover:shadow-lg hover:scale-[1.01] cursor-pointer border flex flex-row items-center space-x-2 min-h-[110px] px-4 py-2 max-w-md"
      onClick={onClick}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
        <BarChart2 size={20} className="text-blue-700" />
      </div>
      <div className="flex-1">
        <CardHeader className="p-0 pb-1">
          <CardTitle className="flex items-center justify-between gap-1 text-base">
            Skills Assessed
            <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-xs ml-auto">{total} tests</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {last ? (
            <div>
              <div className="mb-0.5 text-gray-700 text-sm font-medium">{last.language}</div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl font-bold">{last.score}%</span>
                <ArrowUp size={14} className="text-green-600" />
                <span className="text-green-700 text-xs">Latest</span>
              </div>
              <div className="text-xs text-gray-500">Taken: {new Date(last.created_at).toLocaleDateString()}</div>
            </div>
          ) : (
            <div className="text-gray-400">No skill assessment found.</div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default SkillsAssessedCard;
