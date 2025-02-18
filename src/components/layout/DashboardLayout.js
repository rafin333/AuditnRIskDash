'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Settings, 
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';

// Navigation items excluding logout
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audit Logs', href: '/dashboard/audit-logs', icon: FileText },
  { name: 'Risk Assessment', href: '/dashboard/risk-assessment', icon: AlertTriangle },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to landing page
    router.push('/');
  };

  // Navigation items list with logout handler
  const NavigationList = ({ mobile = false }) => (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              isActive
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon
              className={`mr-3 h-6 w-6 flex-shrink-0 ${
                isActive ? 'text-gray-500' : 'text-gray-400'
              }`}
            />
            {item.name}
          </Link>
        );
      })}
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      >
        <LogOut className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400" />
        Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-40 flex">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setSidebarOpen(false)}
          />

          <div
            className={`fixed inset-y-0 left-0 flex w-64 flex-col bg-white transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex h-16 flex-shrink-0 items-center px-4">
              <span className="text-xl font-bold">AuditTrack Pro</span>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <NavigationList mobile={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4">
            <span className="text-xl font-bold">AuditTrack Pro</span>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <NavigationList />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              {/* Add search bar or other header content here */}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              {/* <div className="relative">
                <button 
                  className="flex items-center text-sm"
                  onClick={handleLogout}
                >
                  <span className="mr-2">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}