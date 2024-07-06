"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Sidebar } from "./sidebar.styles";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebarItem";
import {  CodeXml, PanelsTopLeft, Pen, Users } from "lucide-react";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { collapsed, user } = useAppSelector((state) => state.user);
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <p className="font-bold text-inherit px-4">Dashboard</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {user && (
              <>
                <SidebarItem
                  icon={<PanelsTopLeft />}
                  title={"Project"}
                  isActive={pathname === "/dashboard"}
                  href={"/dashboard"}
                />
                {/* <SidebarItem
                  icon={<Users />}
                  title={"User"}
                  isActive={pathname === "/user"}
                  href={"/user"}
                /> */}
                <SidebarItem
                  icon={<Pen />}
                  title={"Blog"}
                  isActive={pathname === "/addBlog"}
                  href={"/addBlog"}
                />
                <SidebarItem
                  icon={<CodeXml />}
                  title={"Skill"}
                  isActive={pathname === "/skill"}
                  href={"/skill"}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
