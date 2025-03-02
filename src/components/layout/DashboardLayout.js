// 'use client'

// import * as React from 'react'
// import Link from 'next/link'
// import { useRouter, usePathname } from 'next/navigation'
// import { 
//   LayoutDashboard, 
//   FileText, 
//   AlertTriangle, 
//   Settings, 
//   Search, 
//   User, 
//   LogOut,
//   Menu,
//   AlertCircle
// } from 'lucide-react'

// import Input from '../ui/Input'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from '../ui/DropdownMenu'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
//   SidebarTrigger
// } from '../ui/Sidebar'

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: FileText },
//   { name: 'Risk Assessment', href: '/dashboard/risk-assessment', icon: AlertTriangle },
//   { name: 'Mitigations Plan', href: '/dashboard/mitigations-plan', icon: AlertCircle },
//   // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
// ]

// export default function DashboardLayout({ children }) {
//   const pathname = usePathname()
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const NavigationList = () => (
//     <SidebarMenu>
//       {navigation.map((item) => {
//         const isActive = pathname === item.href
//         return (
//           <SidebarMenuItem key={item.name}>
//             <Link 
//               href={item.href}
//               className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full ${
//                 isActive 
//                   ? 'bg-gray-200 text-gray-900' 
//                   : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//               }`}
//             >
//               <item.icon className="mr-3 h-5 w-5" />
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           </SidebarMenuItem>
//         )
//       })}
//     </SidebarMenu>
//   )

//   return (
//     <div className="flex h-screen">
//       {/* Fixed Sidebar */}
//       <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-30">
//         <div className="flex flex-col h-full">
//           <div className="h-16 flex items-center px-6 border-b border-gray-200">
//             <Link href="/dashboard" className="text-xl font-semibold">
//               AuditTrack Pro
//             </Link>
//           </div>
//           <nav className="flex-1 overflow-y-auto py-4">
//             <NavigationList />
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 ml-64">
//         {/* Header */}
//         <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-20">
//           <div className="flex items-center justify-between h-full px-6">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-400">/</span>
//               <span className="capitalize">{pathname.split('/').pop().replace('-', ' ')}</span>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="search"
//                   placeholder="Search..."
//                   className="pl-10 w-64"
//                 />
//               </div>

//               <DropdownMenu>
//                 <DropdownMenuTrigger className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
//                   <User className="h-5 w-5" />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>User Name</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={handleLogout}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="pt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
//           <div className="p-8 w-full">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
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
  Menu,
  AlertCircle
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
  { name: 'Mitigations Plan', href: '/dashboard/mitigations-plan', icon: AlertCircle },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = React.useState("Loading...")

  React.useEffect(() => {
    const fetchUserName = async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjNjExMjgyMTlhODA0YzhjODBhMjgiLCJlbWFpbCI6InJhaXlhbjEyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJ0b2RvIiwibm90ZXMiXSwiaWF0IjoxNzQwODkzOTY3LCJleHAiOjE3NDA5ODAzNjd9.R5sM5hMrcLfLgLdvBEb5nU_r2fShdisRTuh3YCTMD-U';

      if (!token) {
        setUserName("Not Authenticated");
        return;
      }
      try {
        const response = await fetch("http://202.4.109.211:5050/api/users", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
        }
      });
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        const data = await response.json()
        setUserName(data.naam || "Unknown User")
      } catch (error) {
        console.error("Error fetching user:", error)
        setUserName("Error loading user")
      }
    }

    fetchUserName()
  }, [])

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
              className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full ${isActive
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
                  <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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
