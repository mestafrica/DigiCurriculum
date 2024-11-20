import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Getting Started",
      url: "",
      icon: Frame,
      items: [
        {
          title: "Authentication",
          url: "/",
          description: "Register and get your API keys",
        },
        {
          title: "Understanding Curriculum",
          url: "/gettingstarted/curriculum",
          description: "Learn about curriculum structure",
        },
      ],
    },
    {
      title: "Curriculum",
      url: "/curriculum",
      icon: BookOpen,
      items: [
        {
          title: "API endpoints Overview",
          url: "/curriculum/overview",
          description: "See all available endpoints",
        },
        {
          title: "List All Curricula",
          url: "/curriculum/list",
          description: "GET /curriculum - Get all available curricula",
        },
        {
          title: "Get by Grade",
          url: "/curriculum/grade",
          description:
            "GET /curriculum/grade/{grade} - Get curriculum by grade level",
        },
        {
          title: "Search",
          url: "/curriculum/search",
          description:
            "GET /curriculum/search - Search across curriculum content",
        },
      ],
    },
    {
      title: "Assessment",
      url: "/curriculum",
      icon: BookOpen,
      items: [
        {
          title: "API endpoints Overview",
          url: "/assessment/overview",
          description: "See all available endpoints",
        },
        {
          title: "Generate Assessment",
          url: "/generate/assessment",
          description: "POST /assessment -  Generate assessments",
        },
        {
          title: "List All Assessment",
          url: "/assessment/list",
          description: "GET /assessment - Get all generated assessments",
        },
        {
          title: "Get Assessment",
          url: "/assessment",
          description: "GET /assessment - Generate",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Developer Login",
      url: "/devlogin",
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: "Contribution",
      url: "/contribution-guide",
      icon: Frame,
    },
  ],
};

const NavMainItem = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const Icon = item.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100 rounded-md"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </div>
        {item.items && (
          <span className="ml-2">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        )}
      </button>

      {isOpen && item.items && (
        <div className="ml-6 mt-1 space-y-1">
          {item.items.map((subItem, index) => (
            <a
              key={index}
              href={subItem.url}
              className="block px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
            >
              {subItem.title}
              {subItem.description && (
                <p className="text-xs text-gray-500">{subItem.description}</p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomNavProjects = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-1">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <a
            key={index}
            href={item.url}
            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md"
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>Digital Curriculum API</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item, index) => (
            <NavMainItem key={index} item={item} />
          ))}
        </SidebarMenu>
        <SidebarMenu>
          <CustomNavProjects items={data.projects} />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavSecondary items={data.navSecondary} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;