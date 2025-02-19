"use client";

import clsx from "clsx";
import Link from "next/link";

// Breadcrumb Container
export function Breadcrumb({ children, className }) {
  return (
    <nav className={clsx("flex items-center space-x-2 text-sm text-gray-600", className)} aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">{children}</ol>
    </nav>
  );
}

// Breadcrumb List (Wrapper)
export function BreadcrumbList({ children }) {
  return <>{children}</>;
}

// Breadcrumb Item (Individual Item)
export function BreadcrumbItem({ children }) {
  return <li className="flex items-center">{children}</li>;
}

// Breadcrumb Link (Clickable Link)
export function BreadcrumbLink({ href, children }) {
  return (
    <Link href={href} className="hover:underline text-blue-600">
      {children}
    </Link>
  );
}

// Breadcrumb Page (Current Page - Non-clickable)
export function BreadcrumbPage({ children }) {
  return <span className="text-gray-800 font-medium">{children}</span>;
}

// Breadcrumb Separator (Slash `/` or `>` etc.)
export function BreadcrumbSeparator({ symbol = "/" }) {
  return <span className="mx-1 text-gray-400">{symbol}</span>;
}
