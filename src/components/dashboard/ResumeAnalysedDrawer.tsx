
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

interface ResumeAnalysis {
  id: string;
  ats_score: number;
  suggestions: string[];
  filename: string;
  created_at: string;
}

interface ResumeAnalysedDrawerProps {
  analyses: ResumeAnalysis[];
  open: boolean;
  onClose: () => void;
}

const ResumeAnalysedDrawer = ({ analyses, open, onClose }: ResumeAnalysedDrawerProps) => {
  const [filterFile, setFilterFile] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filtered = analyses.filter(
    (a) =>
      (!filterFile || (a.filename && a.filename.toLowerCase().includes(filterFile.toLowerCase()))) &&
      (!filterDate || a.created_at.slice(0,10) === filterDate)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Resume Analysed - History</DialogTitle>
          <DialogDescription>
            Filter your resume analyses by file or date, and view ATS scores and suggestions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mb-4">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No analyses found.</TableCell>
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

export default ResumeAnalysedDrawer;

