"use client";

import { createContext, useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

// Sidebar Context
const SidebarContext = createContext();

// Sidebar Provider (Handles sidebar state)
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      <div className="relative flex">{children}</div>
    </SidebarContext.Provider>
  );
}

// Sidebar (Container)
export function Sidebar({ className, children }) {
  const { isOpen } = useContext(SidebarContext);
  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      {children}
    </aside>
  );
}

// Sidebar Header (Title/Logo)
export function SidebarHeader({ children }) {
  return (
    <div className="px-6 py-4 text-lg font-bold border-b">{children}</div>
  );
}

// Sidebar Content Wrapper
export function SidebarContent({ children }) {
  return <div className="p-4">{children}</div>;
}

// Sidebar Menu
export function SidebarMenu({ children }) {
  return <nav className="mt-4 space-y-2">{children}</nav>;
}

// Sidebar Menu Item (Navigation Links)
export function SidebarMenuItem({ href, icon: Icon, children }) {
  const Component = href ? 'a' : 'div'; // If there's an href, use <a>, otherwise use <div>

  return (
    <Component
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
    >
      {Icon && <Icon className="h-5 w-5 text-gray-500" />}
      {children}
    </Component>
  );
}


// Sidebar Menu Button (For Actions like Logout)
export function SidebarMenuButton({ onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
    >
      {Icon && <Icon className="h-5 w-5 text-gray-500" />}
      {children}
    </button>
  );
}

// Sidebar Toggle Button
export function SidebarTrigger() {
  const { isOpen, toggleSidebar } = useContext(SidebarContext);
  return (
    <button
      onClick={toggleSidebar}
      className="absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-100"
    >
      {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
    </button>
  );
}
