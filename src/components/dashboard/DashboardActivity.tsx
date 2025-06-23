
interface DashboardActivityProps {
  skillResults: {
    created_at: string;
    language: string;
    score: number;
  }[];
  resumeAnalyses: {
    created_at: string;
    filename: string;
    ats_score: number;
  }[];
}

const DashboardActivity = ({ skillResults, resumeAnalyses }: DashboardActivityProps) => {
  const activities = [
    ...skillResults.map(x => ({
      date: x.created_at,
      text: `Skill Test: ${x.language} (${x.score}%)`
    })),
    ...resumeAnalyses.map(x => ({
      date: x.created_at,
      text: `Resume uploaded: ${x.filename || "Unnamed"} (ATS ${x.ats_score})`
    }))
  ];

  const sorted = activities.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime())).slice(0, 5);

  return (
    <div className="min-h-[120px]">
      <div className="font-semibold mb-2 text-sm text-gray-800 dark:text-gray-100">Recent Activity</div>
      {sorted.length === 0 ? (
        <div className="text-gray-400 text-xs">No recent activity.</div>
      ) : (
        <div className="space-y-1">
          {sorted.map((item, i) => (
            <div key={i} className="text-xs text-gray-700 dark:text-gray-200">
              <span className="inline-block w-20 text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardActivity;
