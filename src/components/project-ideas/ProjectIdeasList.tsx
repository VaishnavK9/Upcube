
// Only the essential logic for rendering text ideas as cards with up/downvote
import React, { useEffect, useState, useMemo } from "react";
import ProjectIdeaCard from "./ProjectIdeaCard";
import ProjectIdeasFilter from "./ProjectIdeasFilter";
import { getAllProjectIdeas, getProjectIdeaVotes } from "@/services/projectIdeasService";

const ProjectIdeasList: React.FC = () => {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [votes, setVotes] = useState<{ [ideaId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchVotes = async () => {
    try {
      const votesArr = await getProjectIdeaVotes();
      const voteCountMap: { [id: string]: number } = {};
      votesArr.forEach((v: any) => {
        if (v && typeof v === "object" && typeof v.idea_id === "string" && typeof v.value === "number") {
          voteCountMap[v.idea_id] = (voteCountMap[v.idea_id] || 0) + v.value;
        }
      });
      setVotes(voteCountMap);
      console.log("[ProjectIdeasList] Votes fetched:", voteCountMap);
    } catch (e) {
      console.error("[ProjectIdeasList] Error fetching votes:", e);
    }
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProjectIdeas();
        console.log("[ProjectIdeasList] Ideas fetched:", data);
        setIdeas(data);
      } catch (e: any) {
        setError("Error loading project ideas. Please try again later.");
        console.error("[ProjectIdeasList] Error fetching ideas:", e);
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  useEffect(() => {
    if (!loading && ideas.length > 0) {
      fetchVotes();
    }
  }, [ideas, loading]);

  const handleVoteChange = () => {
    // Refetch votes when a vote changes
    fetchVotes();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
  };

  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = ideas.filter((idea) =>
        idea.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort ideas
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "highest-votes":
          return (votes[b.id] || 0) - (votes[a.id] || 0);
        case "lowest-votes":
          return (votes[a.id] || 0) - (votes[b.id] || 0);
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return sorted;
  }, [ideas, searchTerm, sortBy, votes]);

  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-center">{error}</div>
      )}
      
      <ProjectIdeasFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
      />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!loading && filteredAndSortedIdeas.length > 0
          ? filteredAndSortedIdeas.map((idea) => (
              <ProjectIdeaCard
                key={idea.id}
                idea={idea}
                voteCount={votes[idea.id] || 0}
                onVoteChange={handleVoteChange}
              />
            ))
          : (!loading && filteredAndSortedIdeas.length === 0 ? 
              <div className="text-muted-foreground text-center col-span-full py-10">
                {searchTerm ? "No project ideas match your search." : "No project ideas yet."}
              </div> : null)}
      </div>
    </div>
  );
};

export default ProjectIdeasList;
