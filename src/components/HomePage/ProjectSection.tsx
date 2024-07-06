"use client";

import { useGetProjectsQuery } from "@/redux/features/project/projectApi";
import {
  TProject,
  storProjectData,
} from "@/redux/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import "react-multi-carousel/lib/styles.css";
import ProjectCard from "./ProjectCard";
import { setLoading } from "@/redux/features/user/userSlice";
import { MutableRefObject, useEffect } from "react";
import Carousel from "react-multi-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 574 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 574, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const ProjectSection = ({
  projectRef,
}: {
  projectRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetProjectsQuery("");
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  if (loading || !data) {
    return <div></div>;
  }
  if (data) {
    dispatch(storProjectData(data?.data));
  }
  return (
    <div data-aos="fade-left" ref={projectRef} className="w-11/12 mx-auto pt-20">
      <div className="flex items-center justify-start py-5">
        <p className="w-full h-1 mr-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
        <h1 className="text-4xl font-semibold text-slate-600">
          P<span className="text-blue-500">R</span>OJECTS
        </h1>
      </div>
      <Carousel
        ssr
        draggable={true}
        keyBoardControl={false}
        infinite={true}
        autoPlay={true}
        containerClass="carousel-container"
        itemClass="carousel-image-item"
        autoPlaySpeed={5000}
        transitionDuration={5000}
        responsive={responsive}
      >
        {data?.data.map((project: TProject) => (
          <ProjectCard key={project.name} project={project}></ProjectCard>
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectSection;
