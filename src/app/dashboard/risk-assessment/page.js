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
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Textarea from '@/components/ui/textarea';

const RiskManagement = () => {
    const [issues, setIssues] = useState([]);
    const [owners, setOwners] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newRisk, setNewRisk] = useState({
        issue_id: '',
        risk_code: '',
        risk_type: '',
        probability: '',
        impact: '',
        risk_owner: '',
        risk_status: ''
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2IzMDUxMzk1YmRmODI0Y2ZkODBmYzEiLCJlbWFpbCI6InJhaXlhbjE4eEBnbWFpbC5jb20iLCJyb2xlIjoib3duZXIiLCJhY2wiOlsicmlzaywgbWl0aWdhdGlvbiwgcmVwb3J0Il0sImlhdCI6MTczOTk0MjI0OCwiZXhwIjoxNzQwMDI4NjQ4fQ.HqsTefvUEEvywtv4XA83dtFWy_ttqftoKhh_8MoT2SU";

    useEffect(() => {
        fetchIssues();
        fetchOwners();
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

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://192.168.11.248:5000/api/owner', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setOwners(data);
            } else {
                setOwners([]);
            }
        } catch (error) {
            console.error('Error fetching owners:', error);
            setOwners([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://192.168.11.248:5000/api/risk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newRisk)
            });

            if (response.ok) {
                setIsDialogOpen(false);
                setNewRisk({
                    issue_id: '',
                    risk_code: '',
                    risk_type: '',
                    probability: '',
                    impact: '',
                    risk_owner: '',
                    risk_status: ''
                });

            }
        } catch (error) {
            console.error('Error creating risk:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRisk((prev) => ({ ...prev, [name]: value }));
    };

    const [risks, setRisks] = useState([]);

    useEffect(() => {
        fetchRisks();
    }, []);

    const fetchRisks = async () => {
        try {
            const response = await fetch('http://192.168.11.248:5000/api/risk', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setRisks(data);
            } else {
                setRisks([]);
            }
        } catch (error) {
            console.error('Error fetching risks:', error);
            setRisks([]);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Risk Management</h1>
                    <Button onClick={() => setIsDialogOpen(true)}>Add Risk</Button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Risk</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <select
                                        name="issue_id"
                                        value={newRisk.issue_id}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="" disabled defaultValue className="text-gray-400">Select Issue</option>
                                        {issues.map((issue) => (
                                            <option key={issue._id} value={issue._id}>
                                                {issue.issue_title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Input
                                        name="risk_code"
                                        placeholder="Risk Code"
                                        value={newRisk.risk_code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="risk_type"
                                        placeholder="Risk Type"
                                        value={newRisk.risk_type}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="probability"
                                        placeholder="Probability"
                                        value={newRisk.probability}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="impact"
                                        placeholder="Impact"
                                        value={newRisk.impact}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <select
                                        name="risk_owner"
                                        value={newRisk.risk_owner}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="" disabled defaultValue className="text-gray-400">Select Risk Owner</option>
                                        {owners.map((owner) => (
                                            <option key={owner._id} value={owner._id}>
                                                {owner.naam}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        name="risk_status"
                                        value={newRisk.risk_status}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="" disabled defaultValue className="text-gray-400">Select Status</option>
                                        <option value="Re Assigned">Re Assigned</option>
                                        <option value="Resolved">Resolved</option>
                                        <option value="Open">Open</option>
                                    </select>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" className="flex-1">Create Risk</Button>
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
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>

                                <TableHead>Issue</TableHead>
                                <TableHead>Risk Code</TableHead>
                                <TableHead>Risk Type</TableHead>
                                <TableHead>Probability</TableHead>
                                <TableHead>Impact</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {risks.map((risk) => (
                                <TableRow key={risk._id}>

                                    <TableCell>{risk.issue_details.issue_title}</TableCell>
                                    <TableCell>{risk.risk_code}</TableCell>
                                    <TableCell>{risk.risk_type}</TableCell>
                                    <TableCell>{risk.probability}</TableCell>
                                    <TableCell>{risk.impact}</TableCell>
                                    <TableCell>{risk.owner_details.naam}</TableCell>
                                    <TableCell>{risk.risk_status}</TableCell>
                                    <TableCell>{new Date(risk.date).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RiskManagement;
