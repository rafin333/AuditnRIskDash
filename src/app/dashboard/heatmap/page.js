'use client'; 
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import DashboardLayout from '@/components/layout/DashboardLayout'; 
import DataTable from '@/components/ui/DataTable'; 
import { LogOut } from 'lucide-react'; 
import RiskHeatmap from '@/app/components/RiskHeatMap';


 
export default function Dashboard() { 
  const router = useRouter(); 
  const [loading, setLoading] = useState(false); 
  const [auditData, setAuditData] = useState([]); 
 
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNzYwMTY3LCJleHAiOjE3NDE4NDY1Njd9.-xL9_5dIMWsuxRhkpE3ZqfvstBqnq1DO1MBN73DQMMc'; 
 
  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    router.push('/'); 
  }; 
 
  const handleRowClick = (row) => { 
    console.log('Row clicked:', row); 
  }; 
 
  const dashboardConfig = { 
    menuItems: [ 
      { 
        name: 'Logout', 
        href: '/dashboard/settings', 
        icon: LogOut, 
        onClick: (e) => { 
          e.preventDefault(); 
          handleLogout(); 
        } 
      } 
    ] 
  }; 
 
  return ( 
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-6"> 

        <RiskHeatmap />

      </div> 
    </DashboardLayout> 
  ); 
}