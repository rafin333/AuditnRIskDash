'use client';
import React, { useState, useEffect } from 'react';
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Textarea from '@/components/ui/textarea';

const AuditLogs = () => {
  const [issues, setIssues] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [newIssue, setNewIssue] = useState({
    issue_title: '',
    issue_description: '',
    issue_source: '',
    issue_category: '',
    issue_priority: '',
    issue_status: '',
    issue_attachments: ''
  });

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxODQyNjU3LCJleHAiOjE3NDE5MjkwNTd9.XeAn1PlkOyu8MVB3WUkUvjveB66DxpvbPer_S-m5Vt0";

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await fetch('http://202.4.109.211:5050/api/issue', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setIssues(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setIssues([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `http://202.4.109.211:5050/api/issue/${selectedIssueId}`
        : "http://202.4.109.211:5050/api/issue";

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newIssue)
      });

      if (response.ok) {
        fetchIssues();
        setIsDialogOpen(false);
        setIsEditing(false);
        resetForm();
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "creating"} issue:`, error);
    }
  };

  const handleEdit = (issue) => {
    setIsEditing(true);
    setSelectedIssueId(issue._id);
    setNewIssue(issue);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedIssueId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://202.4.109.211:5050/api/issue/${selectedIssueId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchIssues();
        setIsDeleteDialogOpen(false);
        setSelectedIssueId(null);
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const resetForm = () => {
    setNewIssue({
      issue_title: '',
      issue_description: '',
      issue_source: '',
      issue_category: '',
      issue_priority: '',
      issue_status: '',
      issue_attachments: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <Button onClick={() => { setIsDialogOpen(true); resetForm(); }}>Add Issue</Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Issue" : "Create New Issue"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="issue_title" placeholder="Issue Title" value={newIssue.issue_title} onChange={handleInputChange} />
              <Textarea name="issue_description" placeholder="Issue Description" value={newIssue.issue_description} onChange={handleInputChange} />

              {/* <Input name="issue_source" placeholder="Issue Source" value={newIssue.issue_source} onChange={handleInputChange} /> */}
              <select
                name="issue_source"
                value={newIssue.issue_source}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled defaultValue className="text-gray-400">Select Issue Source</option>
                <option value="Invoices & Receipts">Invoices & Receipts</option>
                <option value="Management Accounts">Management Accounts</option>
                <option value="Payroll System">Payroll System</option>
                <option value="Bank Documents">Bank Documents</option>
                <option value="Balance Sheets">Balance Sheets</option>
                <option value="Cash Flow Statements">Cash Flow Statements</option>
              </select>

              {/* <Input name="issue_category" placeholder="Issue Category" value={newIssue.issue_category} onChange={handleInputChange} /> */}
              <select
                name="issue_category"
                value={newIssue.issue_category}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled defaultValue className="text-gray-400">Select Issue Category</option>
                <option value="Qualified">Qualified</option>
                <option value="Unqualified">Unqualified</option>
                <option value="Disclaimer Of Opinion">Disclaimer Of Opinion</option>
                <option value="Adverse">Adverse</option>
              </select>

              <select name="issue_priority" value={newIssue.issue_priority} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                <option value="" disabled>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select name="issue_status" value={newIssue.issue_status} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                <option value="" disabled>Select Status</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              <Input name="issue_attachment" placeholder="Issue Attachment" value={newIssue.issue_attachments} onChange={handleInputChange} />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">{isEditing ? "Update Issue" : "Create Issue"}</Button>
                <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded h-10 text-sm">Close</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <p>Are you sure you want to delete this issue? This action cannot be undone.</p>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-4">

              <Button
                onClick={() => setIsDeleteDialogOpen(false)}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: 'black',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#48bb78'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: 'black',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e53e3e'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                Delete
              </Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>


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
                <TableHead>Attachment</TableHead>
                <TableHead>Actions</TableHead>
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
                  <TableCell>{issue.issue_attachments}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(issue)}><PencilSquareIcon className="h-5 w-5 text-gray-600" /></button>
                      <button onClick={() => handleDeleteClick(issue._id)}><TrashIcon className="h-5 w-5 text-black" /></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout >
  );
};

export default AuditLogs;