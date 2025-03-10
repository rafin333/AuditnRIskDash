'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { AlertTriangle, CheckCircle, Clock, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import { BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
];

const monthlyData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 300 },
  { name: 'May', value: 400 },
  { name: 'Jun', value: 500 },
  { name: 'Jul', value: 600 },
  { name: 'Aug', value: 700 },
  { name: 'Sep', value: 550 },
  { name: 'Oct', value: 400 },
  { name: 'Nov', value: 300 },
  { name: 'Dec', value: 450 }
];

const charts = [
  { title: 'Alerts V/S Transactions', color: 'from-green-500 to-green-700' },
  { title: 'False Positive', color: 'from-blue-500 to-blue-700' },
  { title: 'True Positive', color: 'from-pink-500 to-pink-700' },
];

const riskData = [
  // { name: 'Low Risk', value: 10, color: '#34D399' },
  // { name: 'Medium Risk', value: 7, color: '#FACC15' },
  // { name: 'High Risk', value: 3, color: '#EF4444' },
  { name: 'Low Risk', value: 10, color: '#10B981' },
  { name: 'Medium Risk', value: 6, color: '#FACC15' },
  { name: 'High Risk', value: 4, color: '#EF4444' },
];

const mitigationData = [
  { name: 'Pending', count: 5, color: '#F59E0B' },
  { name: 'In Progress', count: 8, color: '#F59E0B' },
  { name: 'Completed', count: 12, color: '#F59E0B' },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState([]);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNTkwMTU5LCJleHAiOjE3NDE2NzY1NTl9.Gd0pMRZ9RS9Xrrz_9SzrzoWyhBXLFmgGD4xgOuVXSLY';


  useEffect(() => {
    setLoading(true);
    fetch('http://202.4.109.211:5050/api/issue'
      , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((issue) => ({
          id: issue._id,
          eventType: issue.issue_title,
          user: issue.userId,
          timestamp: issue.date,
          status: issue.issue_status,
          riskLevel: issue.issue_priority,
        }));
        setAuditData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching audit data:', error);
        setLoading(false);
      });
  }, []);

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
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Audit Dashboard</h1>
          <Button>Export Report</Button>
        </div>

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

        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charts.map((chart, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${chart.color} p-6 rounded-xl shadow-lg text-white transition-transform transform hover:scale-105`}
              >
                <h2 className="text-xl font-semibold mb-4">Monthly {chart.title}</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="name" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: '#fff',
                        borderRadius: '6px',
                      }}
                      cursor={{ stroke: 'rgba(255, 255, 255, 0.4)', strokeWidth: 2 }}
                    />
                    <Legend wrapperStyle={{ color: '#ffffff' }} />
                    <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4">Risk Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#fff', borderRadius: '5px' }}
                  cursor={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 2 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4">Mitigation Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mitigationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', borderRadius: '5px' }}
                  cursor={{ stroke: 'rgba(255, 255, 255, 0.3)', strokeWidth: 2 }}
                />
                <Bar dataKey="count" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Audit Logs</h2>
          {loading ? <div>Loading...</div> : <DataTable columns={columns} data={auditData} pagination itemsPerPage={10} />}
        </div>
      </div>
    </DashboardLayout>
  );
}