import { DashboardSidebar } from "@/components/sidebar/profileSidbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio-Admin-dashboard",
  description: "This is admins dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative">
      <DashboardSidebar></DashboardSidebar>
      <div className="mx-auto container">{children}</div>
    </div>
  );
}
