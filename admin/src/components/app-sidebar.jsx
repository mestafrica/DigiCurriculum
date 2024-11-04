import * as React from "react";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

const data = {
  user: {
    name: "admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({...props}) {
  const navItems = [
    {
      title: "Curriculum Form",
      url: "/dashboard/curriculum",
      icon: SquareTerminal,
    },
    {
      title: "Manage Curriculum",
      url: "/dashboard/manage-curriculum",
      icon: Bot,
    },
    {
      title: "Bulk Operations",
      url: "/dashboard/bulk-operations",
      icon: BookOpen,
    },
  ];

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navItems} collapsed={collapsed} /> {/* Pass collapsed state */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "Expand" : "Collapse"}
      </button>
    </Sidebar>
  );
}
