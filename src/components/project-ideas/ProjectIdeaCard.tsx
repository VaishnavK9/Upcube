// Clean, just show idea text and up/downvote (no description/tags/layout fluff)
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { upvoteProjectIdea, downvoteProjectIdea, getUserIdeaVote } from "@/services/projectIdeasService";
import { cn } from "@/lib/utils";

type Props = {
  idea: any;
  voteCount: number;
  onVoteChange?: () => void;
};

const ProjectIdeaCard: React.FC<Props> = ({ idea, voteCount, onVoteChange }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localCount, setLocalCount] = useState<number>(voteCount);
  const [userVote, setUserVote] = useState<number>(0);

  React.useEffect(() => {
    setLocalCount(voteCount);
  }, [voteCount]);

  React.useEffect(() => {
    let ignore = false;
    const fetchVote = async () => {
      if (user) {
        try {
          const v = await getUserIdeaVote(idea.id, user.id);
          if (!ignore && v && typeof v.value === "number") {
            setUserVote(v.value);
          } else if (!ignore) {
            setUserVote(0);
          }
        } catch (error) {
          console.error("Error fetching user vote:", error);
          if (!ignore) setUserVote(0);
        }
      }
    };
    fetchVote();
    return () => { ignore = true };
  }, [user, idea.id]);

  const handleVote = async (value: number) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Voting ${value} on idea ${idea.id} by user ${user.id}`);
      
      if (value === 1) {
        await upvoteProjectIdea(idea.id, user.id);
        const oldVote = userVote;
        setUserVote(1);
        setLocalCount((c) => {
          if (oldVote === -1) return c + 2; // was downvote, now upvote
          if (oldVote === 0) return c + 1;  // was neutral, now upvote
          return c; // was already upvote, no change
        });
      } else if (value === -1) {
        await downvoteProjectIdea(idea.id, user.id);
        const oldVote = userVote;
        setUserVote(-1);
        setLocalCount((c) => {
          if (oldVote === 1) return c - 2;  // was upvote, now downvote
          if (oldVote === 0) return c - 1;  // was neutral, now downvote
          return c; // was already downvote, no change
        });
      }
      
      // Call parent callback to refresh data if provided
      if (onVoteChange) {
        onVoteChange();
      }
      
      console.log("Vote successful");
    } catch (error) {
      console.error("Error voting:", error);
      // Reset optimistic update on error
      setUserVote(userVote);
      setLocalCount(voteCount);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted border rounded-lg flex flex-col items-center justify-center h-32 sm:h-36 p-4 transition">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="text-sm sm:text-base text-center leading-relaxed">{idea.description}</div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Button
          size="icon"
          variant={userVote === 1 ? "default" : "outline"}
          disabled={loading || !user}
          onClick={() => handleVote(1)}
          aria-label="Upvote"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
        <span className={cn(
          "font-bold px-2",
          localCount > 0 ? "text-green-700 dark:text-green-400" : localCount < 0 ? "text-red-500 dark:text-red-400" : "text-muted-foreground"
        )}>
          {localCount > 0 && '+'}{localCount}
        </span>
        <Button
          size="icon"
          variant={userVote === -1 ? "default" : "outline"}
          disabled={loading || !user}
          onClick={() => handleVote(-1)}
          aria-label="Downvote"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdeaCard;
