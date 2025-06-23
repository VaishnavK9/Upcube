
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

interface ResumeAnalysis {
  id: string;
  ats_score: number;
  suggestions: string[];
  filename: string;
  created_at: string;
}

interface ResumeAnalysedDetailViewProps {
  analyses: ResumeAnalysis[];
  onBack: () => void;
}

const ResumeAnalysedDetailView = ({ analyses, onBack }: ResumeAnalysedDetailViewProps) => {
  const [filterFile, setFilterFile] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = analyses.filter(
    (a) =>
      (!filterFile || (a.filename && a.filename.toLowerCase().includes(filterFile.toLowerCase()))) &&
      (!filterDate || a.created_at.slice(0,10) === filterDate)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <Button variant="outline" onClick={onBack} className="mb-6 flex items-center gap-2">
        <ArrowLeft size={16} /> Back to Dashboard
      </Button>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900/90 p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold mb-1">Resume Analysed - History</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Filter your resume analyses by file or date, and view ATS scores and suggestions.</p>
        <div className="flex gap-4 mb-4 flex-wrap">
          <Input
            placeholder="Filter by file"
            value={filterFile}
            onChange={(e) => setFilterFile(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="secondary" onClick={() => { setFilterFile(""); setFilterDate(""); }}>
            Reset
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>ATS Score</TableHead>
                <TableHead>Top Suggestions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No analyses found.</TableCell>
                </TableRow>
              ) : (
                filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>{new Date(a.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{a.filename || "-"}</TableCell>
                    <TableCell>{a.ats_score}</TableCell>
                    <TableCell>
                      <ul className="text-xs">
                        {(a.suggestions || []).slice(0,3).map((s,i) => <li key={i}>• {s}</li>)}
                      </ul>
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

export default ResumeAnalysedDetailView;
