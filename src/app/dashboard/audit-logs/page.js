'use client';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Textarea from '@/components/ui/textarea';

const AuditLogs = () => {
  const [issues, setIssues] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({
    issue_title: '',
    issue_description: '',
    issue_source: '',
    issue_category: '',
    issue_priority: '',
    issue_status: '',
    issue_attachments: ''
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IzMDUxMzk1YmRmODI0Y2ZkODBmYzEiLCJlbWFpbCI6InJhaXlhbjE4eEBnbWFpbC5jb20iLCJyb2xlIjoib3duZXIiLCJhY2wiOlsicmlzaywgbWl0aWdhdGlvbiwgcmVwb3J0Il0sImlhdCI6MTczOTk0MjI0OCwiZXhwIjoxNzQwMDI4NjQ4fQ.HqsTefvUEEvywtv4XA83dtFWy_ttqftoKhh_8MoT2SU";

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://192.168.11.248:5000/api/issue', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setIssues(data);
      } else {
        setIssues([]);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
      setIssues([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.11.248:5000/api/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newIssue)
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setNewIssue({
          issue_title: '',
          issue_description: '',
          issue_source: '',
          issue_category: '',
          issue_priority: '',
          issue_status: '',
          issue_attachments: ''
        });
        fetchIssues();
      }
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const handleInputChange = (e) => {
    if (typeof e === "string") {
      return (name) => setNewIssue((prev) => ({ ...prev, [name]: e }));
    } else {
      const { name, value } = e.target;
      setNewIssue((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log("Submitting:", newIssue);

  return (

    <DashboardLayout>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add Issue</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Issue</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="issue_title"
                    placeholder="Issue Title"
                    value={newIssue.issue_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Textarea
                    name="issue_description"
                    placeholder="Issue Description"
                    value={newIssue.issue_description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    name="issue_source"
                    placeholder="Issue Source"
                    value={newIssue.issue_source}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Input
                    name="issue_category"
                    placeholder="Issue Category"
                    value={newIssue.issue_category}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <select
                    name="issue_priority"
                    value={newIssue.issue_priority}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled defaultValue className="text-gray-400">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <select
                    name="issue_status"
                    value={newIssue.issue_status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled defaultValue className="text-gray-400">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* <Button type="submit" className="w-full">Create Issue</Button> */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">Create Issue</Button>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded h-10 text-sm"
                  >
                    Close
                  </button>
                </div>
              </form>
              {/* <DialogFooter>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Close
                </button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue._id}>
                  <TableCell>{issue.issue_title}</TableCell>
                  <TableCell>{issue.issue_description}</TableCell>
                  <TableCell>{issue.issue_source}</TableCell>
                  <TableCell>{issue.issue_category}</TableCell>
                  <TableCell>{issue.issue_priority}</TableCell>
                  <TableCell>{issue.issue_status}</TableCell>
                  <TableCell>{new Date(issue.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;