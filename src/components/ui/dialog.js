import React, { useState } from "react";

export function Dialog({ open, close, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {children}
        {/* <button onClick={() => setIsDialogOpen(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button> */}
      </div>
    </div>
  );
}

export function DialogTrigger({ children, onOpen }) {
  return (
    <button onClick={onOpen} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
}

export function DialogContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="border-b pb-2 mb-2 text-lg font-bold">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="border-b pb-2 mb-2 text-lg font-bold flex gap-2">{children}</div>;
}

export function DialogBody({ children }) {
  return <div className="pt-4 pb-4">{children}</div>;
}