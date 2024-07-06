"use client";
import SkillCard from "./SkillCard";
import { useGetSkillsQuery } from "@/redux/features/skill/skillApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setLoading } from "@/redux/features/user/userSlice";
import { useEffect } from "react";

const SkillsSection = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetSkillsQuery("");
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);
  if (loading  || !data) {
    return <div></div>;
  }
  return (
    <div className="w-11/12 mx-auto pt-20">
      <div className="flex items-center justify-start py-5">
        <h1 className="text-4xl font-semibold text-slate-600">
          SKI<span className="text-blue-500">LL</span>S
        </h1>
        <p className="w-full h-1 ml-2 rounded-md bg-gradient-to-r from-blue-500 to-teal-400"></p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((skill: { icon: string; name: string }) => (
          <SkillCard key={skill.name} skill={skill}></SkillCard>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
