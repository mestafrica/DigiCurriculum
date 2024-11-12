import React from "react";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { ChevronRight } from "lucide-react";
import "tippy.js/dist/tippy.css";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items, collapsed }) {
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            {collapsed ? (
              <Tippy content={item.title} placement="right">
                <SidebarMenuButton
                  onClick={() => handleNavigation(item.url)}
                  className="w-full cursor-pointer"
                >
                  {item.icon && <item.icon />}
                  <ChevronRight className="ml-auto" />
                </SidebarMenuButton>
              </Tippy>
            ) : (
              <SidebarMenuButton
                onClick={() => handleNavigation(item.url)}
                className="w-full cursor-pointer"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {/* <ChevronRight className="ml-auto" /> */}
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}