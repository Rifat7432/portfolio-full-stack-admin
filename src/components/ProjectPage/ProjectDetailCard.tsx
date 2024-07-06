"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link,
} from "@nextui-org/react";
import Spiner from "../Spiner/Spiner";
import { useGetProjectQuery } from "@/redux/features/project/projectApi";
import { TProject } from "@/redux/features/project/projectSlice";
import ImageSlider from "../ImageSlider/ImageSlider";
import { ExternalLink } from "lucide-react";

const ProjectDetailCard = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetProjectQuery(id);
  if (isLoading) {
    return <Spiner></Spiner>;
  }
  if (!data) {
    return <div></div>;
  }
  const project: TProject = data?.data;
  return (
    <Card className="py-20 bg- px-2 w-11/12 mx-auto bg-sky-50 shadow-sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <ImageSlider images={project.images}></ImageSlider>
      </CardHeader>
      <CardBody className="overflow-visible py-5 flex-col items-start justify-center">
        <div className="flex items-center flex-wrap justify-evenly w-full gap-4 py-5">
          <Button
            className="text-xl font-semibold"
            color="primary"
            variant="ghost"
            as={Link}
            href={project.gitHubClientLink}
          >
            View Client Site<ExternalLink />
          </Button>
          <Button
            className="text-xl font-semibold"
            color="primary"
            variant="ghost"
            as={Link}
            href={project.liveLink}
          >
            View Live Web Site<ExternalLink />
          </Button>
          <Button
            className="text-xl font-semibold"
            color="primary"
            variant="ghost"
            as={Link}
            href={project.gitHubServerLink}
          >
            View Server Site<ExternalLink />
          </Button>
        </div>
        <h4 className="text-4xl font-bold leading-none text-default-600">
          {project.name}
        </h4>
        <div className="py-5">
          <h4 className="text-2xl font-bold leading-none text-default-600 py-2">
            Technology
          </h4>
          <div className="flex items-center justify-evenly gap-4 flex-wrap py-2">
            {project.technology.map((tec) => (
              <Chip key={tec} color="primary" variant="flat">
                {tec}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-3 py-5">
        <div className="flex gap-5">
          <div className="flex flex-col gap-5 items-start justify-center">
            <div>
              <h4 className="text-2xl font-bold leading-none text-default-600 py-2">
                Description
              </h4>
              <h5 className="text-lg tracking-tight text-default-400">
                {project.description}
              </h5>
            </div>
            <div>
              <h4 className="text-2xl font-bold leading-none text-default-600 py-2">
                Details
              </h4>
              {project.details.map((detail) => (
                <h5
                  key={detail}
                  className="text-lg tracking-tight text-default-400"
                >
                  {detail}
                </h5>
              ))}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectDetailCard;
