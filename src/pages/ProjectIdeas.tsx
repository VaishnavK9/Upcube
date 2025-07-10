
import Navbar from "@/components/Navbar";
import ProjectIdeasList from "@/components/project-ideas/ProjectIdeasList";

const ProjectIdeas = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10 pt-24">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Student Project Ideas</h1>
        <ProjectIdeasList />
      </div>
    </>
  );
};

export default ProjectIdeas;