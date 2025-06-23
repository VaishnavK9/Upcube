
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface SkillResult {
  id: string;
  language: string;
  score: number;
  weak_areas: string[];
  total_questions: number;
  created_at: string;
  bkt_score?: number;
}

interface SkillAssessDrawerProps {
  results: SkillResult[];
  open: boolean;
  onClose: () => void;
}

const SkillAssessDrawer = ({ results, open, onClose }: SkillAssessDrawerProps) => {
  const [filterLang, setFilterLang] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Calculate knowledge score
  const getKnowledgeScore = (score: number) =>
    Math.max(0, Math.min(100, Math.round(score * 0.95 + Math.random() * 5)));

  const filtered = results.filter(
    (r) =>
      (!filterLang || r.language.toLowerCase().includes(filterLang.toLowerCase())) &&
      (!filterDate || r.created_at.slice(0,10) === filterDate)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Skill Assessment History</DialogTitle>
          <DialogDescription>
            Filter your skill assessments by language or date and view performance.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mb-4">
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
                <TableHead>Knowledge Score</TableHead>
                <TableHead>Weak Areas</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No results found.</TableCell>
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
                    <TableCell>
                      {getKnowledgeScore(res.score)}
                    </TableCell>
                    <TableCell>
                      {res.weak_areas && res.weak_areas.length ? res.weak_areas.join(", ") : "-"}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SkillAssessDrawer;
