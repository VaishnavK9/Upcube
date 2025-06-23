
import { Progress } from '@/components/ui/progress';

const ScoreCard = ({
  title,
  score,
  color,
}: {
  title: string;
  score: number;
  color: string;
}) => (
  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
    <div className={`text-2xl font-bold ${color} mb-1`}>{score}%</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    <Progress value={score} className="h-2 mt-2" />
  </div>
);

export default ScoreCard;
