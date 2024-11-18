import * as React from "react";
import { BookOpen, Bot, SquareTerminal, List, LayoutDashboard } from "lucide-react"; // Importing new icon for dashboard
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

export function AppSidebar({ ...props }) {
  const navItems = [
    {
      title: "Dashboard Overview",  // New link for Dashboard Overview
      url: "/dashboard/dashboard-overview",
      icon: LayoutDashboard,  // New icon for dashboard overview
      tooltip: "Dashboard Overview",  // Tooltip for Dashboard Overview
    },
    {
      title: "Curriculum Form",
      url: "/dashboard/curriculum",
      icon: SquareTerminal,
      tooltip: "Curriculum Form",
    },
    {
      title: "Curriculum List",  // New link added
      url: "/dashboard/curriculum-list",  // Link to the curriculum list page
      icon: List,  // Changed icon to 'List' which is more appropriate for listing
      tooltip: "Curriculum List",
    },
    {
      title: "Manage Curriculum",
      url: "/dashboard/manage-curriculum",
      icon: Bot,
      tooltip: "Manage Curriculum",
    },
    {
      title: "Bulk Operations",
      url: "/dashboard/bulk-operations",
      icon: BookOpen,
      tooltip: "Bulk Operations",
    },
  ];

  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        {/* Rendering navigation items with tooltips */}
        <NavMain
          items={navItems.map((item) => ({
            ...item,
            element: (
              <div title={item.tooltip} className="flex items-center space-x-2">
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.title}</span>}
              </div>
            ),
          }))}
          collapsed={collapsed}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <button onClick={() => setCollapsed(!collapsed)} className="p-2 text-gray-600 hover:text-gray-800">
        {collapsed ? "Expand" : "Collapse"}
      </button>
    </Sidebar>
  );
}
