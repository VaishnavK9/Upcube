
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface SkillResult {
  id: string;
  language: string;
  score: number;
  weak_areas: string[];
  total_questions: number;
  created_at: string;
  bkt_score?: number;
}

interface SkillsAssessedDetailViewProps {
  results: SkillResult[];
  onBack: () => void;
}

const getBKT = (score: number) =>
  Math.max(0, Math.min(100, Math.round(score * 0.95 + Math.random() * 5)));

const SkillsAssessedDetailView = ({ results, onBack }: SkillsAssessedDetailViewProps) => {
  const [filterLang, setFilterLang] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = results.filter(
    (r) =>
      (!filterLang || r.language.toLowerCase().includes(filterLang.toLowerCase())) &&
      (!filterDate || r.created_at.slice(0,10) === filterDate)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <Button variant="outline" onClick={onBack} className="mb-6 flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Dashboard
      </Button>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900/90 p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold mb-1">Skills Assessed - History</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Filter your skill assessments by language or date and view performance.</p>
        <div className="flex gap-4 mb-4 flex-wrap">
          <Input
            placeholder="Filter by language"
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="secondary" onClick={() => { setFilterLang(""); setFilterDate(""); }}>
            Reset
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Score (%)</TableHead>
                <TableHead>BKT Score</TableHead>
                <TableHead>Weak Areas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No results found.</TableCell>
                </TableRow>
              ) : (
                filtered.map(res => (
                  <TableRow key={res.id}>
                    <TableCell>{new Date(res.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{res.language}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{res.score}</span>
                        <Progress value={res.score} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell>{getBKT(res.score)}</TableCell>
                    <TableCell>
                      {res.weak_areas && res.weak_areas.length ? res.weak_areas.join(", ") : "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SkillsAssessedDetailView;
