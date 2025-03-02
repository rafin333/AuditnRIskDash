import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const AddIssueDialog = ({ onIssueAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    issue_title: '',
    issue_description: '',
    issue_source: '',
    issue_category: '',
    issue_priority: '',
    issue_status: '',
    issue_attachments: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://202.4.109.211:5050/api/issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add issue');
      }

      setFormData({
        issue_title: '',
        issue_description: '',
        issue_source: '',
        issue_category: '',
        issue_priority: '',
        issue_status: '',
        issue_attachments: ''
      });
      setOpen(false);
      
      if (onIssueAdded) {
        onIssueAdded();
      }
    } catch (error) {
      console.error('Error adding issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Issue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              name="issue_title"
              placeholder="Issue Title"
              value={formData.issue_title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <textarea
              name="issue_description"
              placeholder="Issue Description"
              value={formData.issue_description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Input
              name="issue_source"
              placeholder="Issue Source"
              value={formData.issue_source}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              name="issue_category"
              placeholder="Issue Category"
              value={formData.issue_category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <select
              name="issue_priority"
              value={formData.issue_priority}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="space-y-2">
            <select
              name="issue_status"
              value={formData.issue_status}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Issue'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIssueDialog;