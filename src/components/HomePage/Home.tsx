"use client"

import { useRef } from "react";
import Bio from "./Bio";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import SkillsSection from "./SkillsSection";

const Home = () => {
  const projectRef = useRef<HTMLDivElement|null>(null);
  const contactRef = useRef<HTMLDivElement|null>(null);
  return (
    <div>
      <HeroSection projectRef={projectRef} contactRef={contactRef}></HeroSection>
      <Bio></Bio>
      <SkillsSection></SkillsSection>
      <ProjectSection projectRef={projectRef}></ProjectSection>
      <BlogSection></BlogSection>
      <ContactSection contactRef={contactRef}></ContactSection>
    </div>
  );
};

export default Home;
