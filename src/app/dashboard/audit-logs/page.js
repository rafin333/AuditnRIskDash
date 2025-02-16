// 'use client';

// import { useState, useEffect } from "react";
// import { FileText, Plus } from "lucide-react";
// import { format } from "date-fns";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import Button from "@/components/ui/Button";
// import AddIssueDialog from "@/components/dashboard/AddIssueDialog";


// const API_URL = "http://192.168.11.222:5000/api";
// const AUTH_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxNmVhZTczMzQ1NzI4MGFmNWQ5MTUiLCJlbWFpbCI6InJhaXlhbjEyNEBnbWFpbC5jb20iLCJyb2xlIjoibG9nZ2VyIiwiYWNsIjpbImxvZ2dpbmciXSwiaWF0IjoxNzM5NjgxNTQxLCJleHAiOjE3Mzk3Njc5NDF9.laK8owQFWrucnLSkgxkLZTR2R6JdfT7kkJDY_8u_SC4";

// const authenticatedFetch = async (url, options = {}) => {
//   const headers = {
//     Authorization: `Bearer ${AUTH_TOKEN}`,
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   if (response.status === 401) {
//     throw new Error("Authentication failed");
//   }

//   return response;
// };

// export default function AuditLogs() {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const fetchIssues = async () => {
//     try {
//       const res = await authenticatedFetch(`${API_URL}/issue`);
//       if (!res.ok) throw new Error("Failed to fetch issues");
//       const data = await res.json();
//       setIssues(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setSelectedRow(null);
//   };

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   return (
//     <DashboardLayout>
//       <div className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Audit Logs</h1>

//           <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="hover:bg-primary hover:text-primary-foreground"
//                 onClick={() => setDialogOpen(true)}
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Add Issue
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[600px]">
//               <AddIssueDialog onIssueAdded={fetchIssues} onClose={handleDialogClose} selectedRow={selectedRow} />
//             </DialogContent>
//           </Dialog>
//         </div>

//         {loading ? (
//           <div className="text-center py-4">Loading...</div>
//         ) : (
//           <div className="border rounded-lg mb-8">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Priority</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Attachments</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {issues.map((issue) => (
//                   <TableRow key={issue._id} onClick={() => setSelectedRow(issue)}>
//                     <TableCell>{issue.issue_title}</TableCell>
//                     <TableCell>{issue.issue_description}</TableCell>
//                     <TableCell>{issue.issue_category}</TableCell>
//                     <TableCell>{issue.issue_priority}</TableCell>
//                     <TableCell>{issue.issue_status}</TableCell>
//                     <TableCell>{format(new Date(issue.date), "MMM d, yyyy")}</TableCell>
//                     <TableCell>{issue.issue_attachments && <FileText className="w-4 h-4 text-gray-500" />}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';
import React, { useState, useEffect } from "react";
import { FileText, Plus } from "lucide-react";
import { format } from "date-fns";


import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import AddIssueDialog from "@/components/dashboard/AddIssueDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";



const API_URL = "http://192.168.11.222:5000/api";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IxNmVhZTczMzQ1NzI4MGFmNWQ5MTUiLCJlbWFpbCI6InJhaXlhbjEyNEBnbWFpbC5jb20iLCJyb2xlIjoibG9nZ2VyIiwiYWNsIjpbImxvZ2dpbmciXSwiaWF0IjoxNzM5NjgxNTQxLCJleHAiOjE3Mzk3Njc5NDF9.laK8owQFWrucnLSkgxkLZTR2R6JdfT7kkJDY_8u_SC4";

const authenticatedFetch = async (url, options = {}) => {
  const headers = {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error("Authentication failed");
  }

  return response;
};

export default function AuditLogs() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchIssues = async () => {
    try {
      const res = await authenticatedFetch(`${API_URL}/issue`);
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Audit Logs</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover:bg-indigo-600 hover:text-white"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <AddIssueDialog 
                onIssueAdded={fetchIssues} 
                onClose={handleDialogClose} 
                selectedRow={selectedRow} 
              />
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="border rounded-lg mb-8 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Attachments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue._id}>
                    <TableCell>{issue.issue_title}</TableCell>
                    <TableCell>{issue.issue_description}</TableCell>
                    <TableCell>{issue.issue_category}</TableCell>
                    <TableCell>{issue.issue_priority}</TableCell>
                    <TableCell>{issue.issue_status}</TableCell>
                    <TableCell>{format(new Date(issue.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      {issue.issue_attachments && (
                        <FileText className="w-4 h-4 text-gray-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}