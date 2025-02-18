'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { AlertTriangle, CheckCircle, Clock, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

// Define columns for the table
const columns = [
  { key: 'eventType', label: 'Event Type' },
  { key: 'user', label: 'User' },
  { key: 'timestamp', label: 'Timestamp' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => {
      const statusConfig = {
        Completed: { icon: CheckCircle, color: 'text-green-500' },
        Pending: { icon: Clock, color: 'text-yellow-500' },
        Failed: { icon: AlertTriangle, color: 'text-red-500' },
      };
      const StatusIcon = statusConfig[value]?.icon;
      return (
        <div className="flex items-center gap-2">
          {StatusIcon && <StatusIcon className={`h-4 w-4 ${statusConfig[value].color}`} />}
          {value}
        </div>
      );
    }
  },
  { 
    key: 'riskLevel', 
    label: 'Risk Level',
    render: (value) => {
      const colorMap = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[value]}`}>
          {value}
        </span>
      );
    }
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState([]);
  
  // Define your token here
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxNmVhZTczMzQ1NzI4MGFmNWQ5MTUiLCJlbWFpbCI6InJhaXlhbjEyNEBnbWFpbC5jb20iLCJyb2xlIjoibG9nZ2VyIiwiYWNsIjpbImxvZ2dpbmciXSwiaWF0IjoxNzM5NzY4MzM2LCJleHAiOjE3Mzk4NTQ3MzZ9.KrGp6Dr34HPnYt681shYgMaoPG5sGH-yU4oLlT1X5Oo';

  // Fetch audit logs data from the API
  useEffect(() => {
    setLoading(true);
    fetch('http://192.168.11.222:5000/api/issue', {
      headers: {
        'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((issue) => ({
          id: issue._id,
          eventType: issue.issue_title, // map field name to event type
          user: issue.userId,           // assuming userId is available or mapping needed
          timestamp: issue.date,
          status: issue.issue_status,   // map field name to status
          riskLevel: issue.issue_priority, // map field name to risk level
        }));
        setAuditData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching audit data:', error);
        setLoading(false);
      });
  }, [token]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigate to landing page using Next.js router
    router.push('/');
  };

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
  };

  // Dashboard layout configuration including logout
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
    <DashboardLayout config={dashboardConfig}>
      <div className="space-y-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Audit Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Monitor and manage your audit logs and risk assessments
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Audits
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      1,234
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Reviews
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      23
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      High Risk Events
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      5
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Audit Logs</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DataTable
              columns={columns}
              data={auditData}
              onRowClick={handleRowClick}
              searchable
              pagination
              itemsPerPage={10}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
