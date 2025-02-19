// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   FileText, 
//   AlertTriangle, 
//   Settings, 
//   ChevronDown,
//   Menu,
//   X,
//   LogOut
// } from 'lucide-react';

// // Navigation items excluding logout
// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: FileText },
//   { name: 'Risk Assessment', href: '/dashboard/risk-assessment', icon: AlertTriangle },
//   { name: 'Settings', href: '/dashboard/settings', icon: Settings },
// ];

// export default function DashboardLayout({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     // Clear authentication data
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
    
//     // Redirect to landing page
//     router.push('/');
//   };

//   // Navigation items list with logout handler
//   const NavigationList = ({ mobile = false }) => (
//     <nav className="flex-1 space-y-1 px-2 py-4">
//       {navigation.map((item) => {
//         const isActive = pathname === item.href;
//         return (
//           <Link
//             key={item.name}
//             href={item.href}
//             className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
//               isActive
//                 ? 'bg-gray-100 text-gray-900'
//                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//             }`}
//           >
//             <item.icon
//               className={`mr-3 h-6 w-6 flex-shrink-0 ${
//                 isActive ? 'text-gray-500' : 'text-gray-400'
//               }`}
//             />
//             {item.name}
//           </Link>
//         );
//       })}
      
//       {/* Logout button */}
//       <button
//         onClick={handleLogout}
//         className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//       >
//         <LogOut className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400" />
//         Logout
//       </button>
//     </nav>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Mobile sidebar */}
//       <div className="lg:hidden">
//         <div className="fixed inset-0 z-40 flex">
//           <div
//             className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
//               sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//             }`}
//             onClick={() => setSidebarOpen(false)}
//           />

//           <div
//             className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-white transition-transform duration-300 ease-in-out ${
//               sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//             }`}
//           >
//             <div className="flex h-16 flex-shrink-0 items-center px-4">
//               {/* <span className="text-xl font-bold">AuditTrack Pro</span> */}
//             </div>
//             <div className="flex flex-1 flex-col overflow-y-auto">
//               <NavigationList mobile={true} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
//         <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
//           <div className="flex h-16 flex-shrink-0 items-center px-4">
//             {/* <span className="text-xl font-bold">AuditTrack Pro</span> */}
//           </div>
//           <div className="flex flex-1 flex-col overflow-y-auto">
//             <NavigationList />
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64 flex flex-col flex-1">
//         <div className="items-center sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
//         <h1 className="w-full text-2xl font-bold text-center block">AuditTrack Pro</h1>
//           <button
//             type="button"
//             className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <span className="sr-only">Open sidebar</span>
//             <Menu className="h-6 w-6" />
//           </button>
//           <div className="flex flex-1 justify-between px-4">
//             <div className="flex flex-1">
//               {/* Add search bar or other header content here */}
//             </div>
//             <div className="ml-4 flex items-center md:ml-6">
//               {/* Profile dropdown */}
//               {/* <div className="relative">
//                 <button 
//                   className="flex items-center text-sm"
//                   onClick={handleLogout}
//                 >
//                   <span className="mr-2">John Doe</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         <main className="flex-1">
//           <div className="py-6">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
//               {children}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Settings, 
  Search, 
  User, 
  LogOut,
  Menu
} from 'lucide-react'

import Input from '../ui/Input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/DropdownMenu'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '../ui/Sidebar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: FileText },
  { name: 'Risk Assessment', href: '/dashboard/risk-assessment', icon: AlertTriangle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const NavigationList = () => (
    <SidebarMenu>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <SidebarMenuItem key={item.name}>
            <Link 
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full ${
                isActive 
                  ? 'bg-gray-200 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )

  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <Link href="/dashboard" className="text-xl font-semibold">
              AuditTrack Pro
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <NavigationList />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-20">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              <span className="capitalize">{pathname.split('/').pop().replace('-', ' ')}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                  <User className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>User Name</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <div className="p-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}