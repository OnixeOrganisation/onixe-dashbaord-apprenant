"use client";

import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { rootUser } from "@/data/users";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { SchoolSwitcher } from "./school-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.values.sidebar_variant,
      sidebarCollapsible: s.values.sidebar_collapsible,
      isSynced: s.isSynced,
    })),
  );

  const { open, setOpen } = useSidebar();

  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!open) {
      setOpen(true);
    }
    props.onMouseEnter?.(e);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!open) {
      setOpen(true);
    }
    props.onClickCapture?.(e);
  };

  return (
    <Sidebar
      {...props}
      variant={variant}
      collapsible={collapsible}
      onMouseEnter={handleMouseEnter}
      onClickCapture={handleClickCapture}
    >
      <SidebarHeader className="border-b border-sidebar-border/50 p-0">
        <SchoolSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50">
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
