// import React from "react";

// export function Table({ children, className }) {
//   return <table className={`w-full border-collapse ${className}`}>{children}</table>;
// }

// export function TableHeader({ children }) {
//   return <thead className="bg-gray-100 text-left">{children}</thead>;
// }

// export function TableHead({ children }) {
//   return <th className="px-4 py-2 font-medium text-gray-700">{children}</th>;
// }

// export function TableBody({ children }) {
//   return <tbody>{children}</tbody>;
// }

// export function TableRow({ children }) {
//   return <tr className="border-b">{children}</tr>;
// }

// export function TableCell({ children }) {
//   return <td className="px-4 py-2">{children}</td>;
// }




import React from 'react';

export const Table = ({ children }) => (
  <table className="w-full">{children}</table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-50">{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children, onClick }) => (
  <tr 
    onClick={onClick}
    className={onClick ? 'cursor-pointer hover:bg-gray-50' : ''}
  >
    {children}
  </tr>
);

export const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export const TableCell = ({ children }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    {children}
  </td>
);