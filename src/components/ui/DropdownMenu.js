"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Main DropdownMenu wrapper
export function DropdownMenu({ children }) {
  return <Menu as="div" className="relative inline-block text-left">{children}</Menu>;
}

// Dropdown Trigger Button
export function DropdownMenuTrigger({ children }) {
  return (
    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
      {children}
      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-500" />
    </Menu.Button>
  );
}

// Dropdown Content Wrapper
export function DropdownMenuContent({ children }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {children}
      </Menu.Items>
    </Transition>
  );
}

// Dropdown Menu Label
export function DropdownMenuLabel({ children }) {
  return (
    <div className="px-4 py-2 text-sm font-semibold text-gray-700">
      {children}
    </div>
  );
}

// Individual Menu Items
export function DropdownMenuItem({ onClick, children }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
          } group flex w-full items-center px-4 py-2 text-sm`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

// Separator for Menu Items
export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-200 my-1"></div>;
}
