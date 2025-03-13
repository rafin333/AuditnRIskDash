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
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const MitigationPlan = () => {
    const [risks, setRisks] = useState([]);
    const [mitigations, setMitigations] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMitigationId, setSelectedMitigationId] = useState(null);

    const [newMitigation, setNewMitigation] = useState({
        risk_id: '',
        actions: '',
        timeline: '',
        resources: '',
        status: '',
        userId: '67b3051395bdf824cfd80fc1'
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxODQyNjU3LCJleHAiOjE3NDE5MjkwNTd9.XeAn1PlkOyu8MVB3WUkUvjveB66DxpvbPer_S-m5Vt0";

    useEffect(() => {
        fetchRisks();
        fetchMitigations();
    }, []);

    const fetchRisks = async () => {
        try {
            const response = await fetch('http://202.4.109.211:5050/api/risk', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setRisks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching risks:', error);
            setRisks([]);
        }
    };

    const fetchMitigations = async () => {
        try {
            const response = await fetch('http://202.4.109.211:5050/api/mitigation', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setMitigations(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching mitigations:', error);
            setMitigations([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? "PUT" : "POST";
            const url = isEditing
                ? `http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}`
                : "http://202.4.109.211:5050/api/mitigation";

            const body = {
                risk_id: newMitigation.risk_id,
                actions: newMitigation.actions,
                timeline: newMitigation.timeline,
                resources: newMitigation.resources,
                status: newMitigation.status,
                userId: newMitigation.userId
            };

            if (isEditing) {
                body.complete = true; // For PUT request
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                fetchMitigations();
                resetDialog();
            } else {
                const errorData = await response.json();
                console.error('Submission error:', errorData);
                alert('Failed to submit mitigation: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error(`Error ${isEditing ? "updating" : "creating"} mitigation:`, error);
            alert(`Error ${isEditing ? "updating" : "creating"} mitigation`);
        }
    };

    const handleEdit = (mitigation) => {
        setIsEditing(true);
        setSelectedMitigationId(mitigation._id);
        setNewMitigation({
            risk_id: mitigation.risk_id,
            actions: mitigation.actions,
            timeline: mitigation.timeline,
            resources: mitigation.resources,
            status: mitigation.status,
            userId: mitigation.userId
        });
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedMitigationId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedMitigationId) return;

        try {
            const response = await fetch(`http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchMitigations();
                resetDialog();
            }
        } catch (error) {
            console.error('Error deleting mitigation:', error);
        }
    };

    const resetDialog = () => {
        setIsDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setIsEditing(false);
        setSelectedMitigationId(null);
        setNewMitigation({
            risk_id: '',
            actions: '',
            timeline: '',
            resources: '',
            status: '',
            userId: '67b3051395bdf824cfd80fc1'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMitigation(prev => ({ ...prev, [name]: value }));
    };

    const currentYear = new Date().getFullYear();
    const timelineOptions = [
        `Q1 ${currentYear}`, `Q2 ${currentYear}`, `Q3 ${currentYear}`, `Q4 ${currentYear}`,
        `Q1 ${currentYear + 1}`, `Q2 ${currentYear + 1}`, `Q3 ${currentYear + 1}`, `Q4 ${currentYear + 1}`
    ];

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Mitigation Plan</h1>
                    <Button onClick={() => {
                        setIsDialogOpen(true);
                        setIsEditing(false);
                        setNewMitigation({
                            risk_id: '',
                            actions: '',
                            timeline: '',
                            resources: '',
                            status: '',
                            userId: '67b3051395bdf824cfd80fc1'
                        });
                    }}>
                        Add Mitigation
                    </Button>
                </div>

                {/* Mitigation Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Mitigation" : "Create New Mitigation"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <select
                                    name="risk_id"
                                    value={newMitigation.risk_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Risk</option>
                                    {risks.map((risk) => (
                                        <option key={risk._id} value={risk._id}>
                                            {risk.risk_code}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    name="actions"
                                    value={newMitigation.actions}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Action</option>
                                    <option value="Risk Avoidance">Risk Avoidance</option>
                                    <option value="Risk Reduction">Risk Reduction</option>
                                    <option value="Risk Transfer">Risk Transfer</option>
                                    <option value="Risk Acceptance">Risk Acceptance</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    name="timeline"
                                    value={newMitigation.timeline}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Timeline</option>
                                    {timelineOptions.map((timeline) => (
                                        <option key={timeline} value={timeline}>
                                            {timeline}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    name="resources"
                                    value={newMitigation.resources}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Resources</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Contingency Funds">Contingency Funds</option>
                                    <option value="Backups">Backups</option>
                                    <option value="Alternative Vendors">Alternative Vendors</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    name="status"
                                    value={newMitigation.status}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Not Started">Not Started</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1">
                                    {isEditing ? "Update Mitigation" : "Create Mitigation"}
                                </Button>
                                <button
                                    onClick={() => setIsDialogOpen(false)}
                                    className="px-4 py-2 bg-red-500 text-white rounded h-10 text-sm"
                                >
                                    Close
                                </button>
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
                            <p>Are you sure you want to delete this mitigation? This action cannot be undone.</p>
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

                {/* Mitigation Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Risk ID</TableHead>
                                <TableHead>Actions</TableHead>
                                <TableHead>Timeline</TableHead>
                                <TableHead>Resources</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mitigations.map((mitigation) => (
                                <TableRow key={mitigation._id}>
                                    <TableCell>{mitigation.risk_id}</TableCell>
                                    <TableCell>{mitigation.actions}</TableCell>
                                    <TableCell>{mitigation.timeline}</TableCell>
                                    <TableCell>{mitigation.resources}</TableCell>
                                    <TableCell>{mitigation.status}</TableCell>
                                    <TableCell>
                                        {new Date(mitigation.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(mitigation)}
                                                aria-label="Edit"
                                            >
                                                <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(mitigation._id)}
                                                aria-label="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5 text-black" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MitigationPlan;