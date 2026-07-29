"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FolderOpen,
  ListTodo,
  LayoutGrid,
  Settings,
} from "lucide-react";

const items = [
  { href: "/app", label: "Home", icon: LayoutGrid },
  { href: "/app/assignments", label: "Assignments", icon: ListTodo },
  { href: "/app/documents", label: "Files", icon: FolderOpen },
  { href: "/app/courses", label: "Courses", icon: BookOpen },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive =
          item.href === "/app"
            ? pathname === "/app"
            : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive}
            className="app-sidebar-link"
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
