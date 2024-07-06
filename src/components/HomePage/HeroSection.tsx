"use client";

import { useGetUserQuery } from "@/redux/features/user/userApi";
import { setLoading, storUserData } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Button, Image, Link } from "@nextui-org/react";
import { MutableRefObject, useEffect } from "react";

const HeroSection = ({
  projectRef,
  contactRef,
}: {
  projectRef: MutableRefObject<HTMLDivElement | null>;
  contactRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const dispatch = useAppDispatch();
  const { loading,user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetUserQuery("");
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading]);

  if (loading || !data) {
    return <div></div>;
  }
  if (data) {
    dispatch(storUserData(data?.data));
  }

  return (
    <section className="flex flex-col-reverse sm:flex-row items-center justify-evenly px-2 pt-20 pb-10 text-center sm:text-start bg-gradient-to-r from-blue-200 to-teal-100 rounded-b-xl shadow-lg">
      <div>
        <i className="text-3xl font-bold mb-2 text-slate-800">
          H<span className="text-blue-700">i</span> ,
        </i>
        <h2>
          <i className="text-4xl font-bold mb-2 text-slate-800">
            I <span className="text-blue-700">am</span> MD Rifat
          </i>
        </h2>

        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Full Stack Web Developer
        </h2>
        <p className="text-lg mb-6 text-slate-700">
          Creating innovative web application with modern technologies
        </p>
        <div className="cta-buttons flex justify-center sm:justify-start space-x-4 mb-6">
          <Button
            onClick={() =>
              projectRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
            color="primary"
            variant="solid"
          >
            View Projects
          </Button>
          <Button
            color="primary"
            variant="ghost"
            onClick={() =>
              contactRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Contact Me
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-6 w-52 h-80 relative">
          <Image
            src={user?.image2}
            alt="MD Rifat Talukdar"
            className="w-52 h-80 border-2 border-b-0 rounded-full object-cover mx-auto z-30"
          />
          <div className="h-80 w-52 rounded-full z-10 bg-gradient-to-r from-blue-500 to-teal-400 absolute bottom-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
