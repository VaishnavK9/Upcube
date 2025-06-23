
interface DashboardQuickStatsProps {
  totalTests: number;
  avgScore: number;
  recentResumeScore: number | null;
}
const DashboardQuickStats = ({ totalTests, avgScore, recentResumeScore }: DashboardQuickStatsProps) => (
  <div className="flex flex-wrap gap-3 mb-4">
    <div className="bg-blue-50 rounded-md px-4 py-2 flex flex-col items-center min-w-[110px]">
      <span className="font-semibold text-blue-700 text-lg">{totalTests}</span>
      <span className="text-xs text-blue-900">Skill Tests</span>
    </div>
    <div className="bg-purple-50 rounded-md px-4 py-2 flex flex-col items-center min-w-[110px]">
      <span className="font-semibold text-purple-700 text-lg">{avgScore}%</span>
      <span className="text-xs text-purple-900">Avg Score</span>
    </div>
    <div className="bg-green-50 rounded-md px-4 py-2 flex flex-col items-center min-w-[110px]">
      <span className="font-semibold text-green-700 text-lg">{recentResumeScore !== null ? recentResumeScore : "--"}</span>
      <span className="text-xs text-green-900">Latest ATS</span>
    </div>
  </div>
)
export default DashboardQuickStats;
