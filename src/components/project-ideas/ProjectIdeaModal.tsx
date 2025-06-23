
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
// import { createProjectIdea } from "@/services/projectIdeasService"; // Submission disabled for now

interface Props {
  open: boolean;
  onClose: () => void;
}
const tagOptions = ["Python", "JavaScript", "Java", "C++", "AI", "Web", "Mobile"];

// Submission feature is disabled per request
const ProjectIdeaModal: React.FC<Props> = ({ open, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Submission is disabled
  // const submit = async () => {
  //   if (!title.trim() || !description.trim()) return;
  //   setLoading(true);
  //   try {
  //     await createProjectIdea({
  //       title,
  //       description,
  //       tags,
  //       user_id: user.id,
  //     });
  //     setTitle("");
  //     setDescription("");
  //     setTags([]);
  //     onClose();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Project Idea</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground text-center py-10">
          Submitting new ideas is currently disabled.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectIdeaModal;
