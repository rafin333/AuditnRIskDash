'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { AlertTriangle, CheckCircle, Clock, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import { BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, ZAxis, Scatter } from 'recharts';


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
  { title: 'Issue Risk Conversion', color: 'from-green-500 to-green-700' },
  { title: 'Issue Ratio', color: 'from-blue-500 to-blue-700' },
  { title: 'Risk Ratio', color: 'from-pink-500 to-pink-700' },
];

const riskData = [
  { name: 'Low Risk', value: 10, color: '#10B981' },
  { name: 'Medium Risk', value: 6, color: '#FACC15' },
  { name: 'High Risk', value: 4, color: '#EF4444' },
];

const mitigationData = [
  { name: 'Pending', count: 5, color: '#F59E0B' },
  { name: 'In Progress', count: 8, color: '#F59E0B' },
  { name: 'Completed', count: 12, color: '#F59E0B' },
];

const heatData = [
  { probability: "High", severity: "Low", risks: "", color: "bg-green-500" },
  { probability: "High", severity: "Low Medium", risks: "R11, R18, R36", color: "bg-yellow-300" },
  { probability: "High", severity: "Medium", risks: "R30, R35, R39", color: "bg-red-500" },
  { probability: "High", severity: "High Medium", risks: "R41", color: "bg-red-600" },
  { probability: "High", severity: "High", risks: "R37, R42", color: "bg-red-700" },

  { probability: "Next 2 years", severity: "Low", risks: "", color: "bg-green-500" },
  { probability: "Next 2 years", severity: "Low Medium", risks: "R1, R7, R22, R23, R24, R26", color: "bg-yellow-300" },
  { probability: "Next 2 years", severity: "Medium", risks: "R2, R16, R17, R25, R32, R33, R38", color: "bg-red-500" },
  { probability: "Next 2 years", severity: "High Medium", risks: "", color: "bg-red-600" },
  { probability: "Next 2 years", severity: "High", risks: "", color: "bg-red-700" },

  { probability: "Next 3 years", severity: "Low", risks: "Monitor", color: "bg-green-500 font-bold" },
  { probability: "Next 3 years", severity: "Low Medium", risks: "R9, R21, R27", color: "bg-green-500" },
  { probability: "Next 3 years", severity: "Medium", risks: "Manage", color: "bg-yellow-300 font-bold" },
  { probability: "Next 3 years", severity: "High Medium", risks: "Mitigate", color: "bg-orange-400 font-bold" },
  { probability: "Next 3 years", severity: "High", risks: "R3, R4, R5, R6, R10, R12, R13, R14", color: "bg-red-500" },

  { probability: "Next 4 years", severity: "Low", risks: "R20, R15", color: "bg-green-500" },
  { probability: "Next 4 years", severity: "Low Medium", risks: "R40", color: "bg-green-500" },
  { probability: "Next 4 years", severity: "Medium", risks: "", color: "bg-yellow-300" },
  { probability: "Next 4 years", severity: "High Medium", risks: "", color: "bg-red-500" },
  { probability: "Next 4 years", severity: "High", risks: "", color: "bg-red-700" },

  { probability: "Next 5 years", severity: "Low", risks: "Monitor", color: "bg-green-500 font-bold" },
  { probability: "Next 5 years", severity: "Low Medium", risks: "R40", color: "bg-green-500" },
  { probability: "Next 5 years", severity: "Medium", risks: "Manage", color: "bg-yellow-300 font-bold" },
  { probability: "Next 5 years", severity: "High Medium", risks: "Mitigate", color: "bg-red-500 font-bold" },
  { probability: "Next 5 years", severity: "High", risks: "", color: "bg-red-700" },

  { probability: "Less than 10 years", severity: "Low", risks: "R28, R29, R31, R34", color: "bg-green-500" },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState([]);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNjgyNTQ1LCJleHAiOjE3NDE3Njg5NDV9.lb72FfOC4yBh6Pl82OBwDfxaW65_QMpJ69z2l7llGys';


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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[
            { icon: CheckCircle, color: "text-green-500 bg-green-100", title: "Total Audits", value: "1,234" },
            { icon: Clock, color: "text-yellow-500 bg-yellow-100", title: "Pending Reviews", value: "23" },
            { icon: AlertTriangle, color: "text-red-500 bg-red-100", title: "High Risk Events", value: "5" },
          ].map(({ icon: Icon, color, title, value }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">

                <div className={`p-3 rounded-full ${color}`}>
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">{title}</p>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-white shadow rounded-lg p-6">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex flex-col gap-6">

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
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                    cursor={{ stroke: "rgba(255, 255, 255, 0.3)", strokeWidth: 2 }}
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
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "#fff",
                      borderRadius: "5px",
                    }}
                    cursor={{ stroke: "rgba(255, 255, 255, 0.3)", strokeWidth: 2 }}
                  />
                  <Bar dataKey="count" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>


          <div className="overflow-auto p-6 bg-white shadow-lg rounded-lg col-span-2">
            <h2 className="text-lg font-medium mb-4 text-center">Risk Heatmap</h2>
            <div className="grid grid-cols-6 gap-1 border border-gray-400">

              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400"></div>
              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">Low</div>
              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">Low Medium</div>
              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">Medium</div>
              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">High Medium</div>
              <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">High</div>


              {["High", "Next 2 years", "Next 3 years", "Next 4 years", "Next 5 years", "Less than 10 years"].map((prob, index) => (
                <React.Fragment key={prob}>  
                  <div className="bg-gray-200 p-3 font-bold text-center border border-gray-400">{prob}</div>
                  {["Low", "Low Medium", "Medium", "High Medium", "High"].map((sev) => {
                    const cell = heatData.find((r) => r.probability === prob && r.severity === sev);
                    return (
                      <div
                        key={`${prob}-${sev}`}
                        className={`${cell?.color || "bg-gray-300"} p-3 min-h-[80px] text-center border border-gray-400`}
                      >
                        {cell?.risks || ""}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}

            </div>
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