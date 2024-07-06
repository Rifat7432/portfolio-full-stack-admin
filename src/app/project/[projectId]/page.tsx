import ProjectDetailCard from "@/components/ProjectPage/ProjectDetailCard";

const ProjectDetailPage = ({ params }: { params: { projectId: string } }) => {
  return (
    <div>
      <ProjectDetailCard id={params.projectId}></ProjectDetailCard>
    </div>
  );
};

export default ProjectDetailPage;
