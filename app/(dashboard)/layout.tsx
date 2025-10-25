import { ReactNode } from "react";
import { SideBar } from "./_components/sidebar";
import OrgSideBar from "./_components/org-sidebar";
import NavBar from "./_components/navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main>
      <SideBar />
      <div className="pl-16 h-full bg-cyan-800">
        <div className="flex gap-x-3 h-full">
          <OrgSideBar />
          <div className="h-full flex-1">
            <NavBar/>
            {children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
