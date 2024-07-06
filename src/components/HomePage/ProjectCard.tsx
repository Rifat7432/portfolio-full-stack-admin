import { TProject } from "@/redux/features/project/projectSlice";
import { Button, Image, Link } from "@nextui-org/react";
import { useState } from "react";

const ProjectCard = ({ project }: { project: TProject }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="border-2 w-64 h-64  rounded-lg relative"
    >
      <div className="absolute rounded-lg top-0">
        <Image
          src={project.images[0]}
          alt="project image"
          className={`w-64 h-64 rounded-lg object-cover  ${
            isHover ? "z-10" : "z-30"
          }`}
        />
      </div>

      <div
        className={`w-64 h-64 absolute rounded-lg bg-slate-800 opacity-50 z-20 top-0 ${
          isHover ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`w-64 h-64 absolute flex flex-col items-center justify-center rounded-lg top-0 ${
          isHover ? "block z-30" : "z-10 hidden"
        }`}
      >
        <h2 className="text-xl text-gray-100 font-bold mb-3">{project.name}</h2>
        <h2 className="text-sm text-gray-200 font-light mb-5 text-center">
          {project.description.length > 60
            ? `${project.description.slice(0, 60)}...`
            : project.description}
        </h2>
        <Button
          as={Link}
          href={`/project/${project._id}`}
          color="primary"
          variant="shadow"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
