// 'use client';
// import React, { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from '@/components/ui/table';
// import {
//     Dialog,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger
// } from '@/components/ui/dialog';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import DashboardLayout from '@/components/layout/DashboardLayout';
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// const MitigationPlan = () => {
//     const [mitigations, setMitigations] = useState([]);
//     const [risks, setRisks] = useState([]);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [selectedMitigationId, setSelectedMitigationId] = useState(null);
//     const [newMitigation, setNewMitigation] = useState({
//         risk_id: '',
//         actions: '',
//         timeline: '',
//         resources: '',
//         status: ''
//     });

//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FjNjExMjgyMTlhODA0YzhjODBhMjgiLCJlbWFpbCI6InJhaXlhbjEyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJ0b2RvIiwibm90ZXMiXSwiaWF0IjoxNzQwODkzOTY3LCJleHAiOjE3NDA5ODAzNjd9.R5sM5hMrcLfLgLdvBEb5nU_r2fShdisRTuh3YCTMD-U";

//     useEffect(() => {
//         fetchMitigations();
//         fetchRisks();
//     }, []);

//     const fetchMitigations = async () => {
//         try {
//             const response = await fetch('http://202.4.109.211:5050/api/mitigation', {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             setMitigations(Array.isArray(data) ? data : []);
//         } catch (error) {
//             console.error('Error fetching mitigations:', error);
//         }
//     };

//     const fetchRisks = async () => {
//         try {
//             const response = await fetch('http://202.4.109.211:5050/api/risk', {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             setRisks(Array.isArray(data) ? data : []);
//         } catch (error) {
//             console.error('Error fetching risks:', error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const method = isEditing ? "PUT" : "POST";
//             const url = isEditing 
//                 ? `http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}` 
//                 : "http://202.4.109.211:5050/api/mitigation";

//             const response = await fetch(url, {
//                 method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(newMitigation)
//             });

//             if (response.ok) {
//                 fetchMitigations();
//                 setIsDialogOpen(false);
//                 setIsEditing(false);
//                 resetForm();
//             }
//         } catch (error) {
//             console.error(`Error ${isEditing ? "updating" : "creating"} mitigation:`, error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewMitigation((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEdit = (mitigation) => {
//         setIsEditing(true);
//         setSelectedMitigationId(mitigation._id);
//         setNewMitigation({ ...mitigation });
//         setIsDialogOpen(true);
//     };

//     const resetForm = () => {
//         setNewMitigation({ risk_id: '', actions: '', timeline: '', resources: '', status: '' });
//     };

//     return (
//         <DashboardLayout>
//             <div className="p-8">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">Mitigation Plan</h1>
//                     <Button onClick={() => { setIsDialogOpen(true); resetForm(); }}>Add Mitigation</Button>
//                 </div>

//                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                     <DialogContent>
//                         <DialogHeader>
//                             <DialogTitle>{isEditing ? "Edit Mitigation" : "Create New Mitigation"}</DialogTitle>
//                         </DialogHeader>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <select
//                                 name="risk_id"
//                                 value={newMitigation.risk_id}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="w-full p-2 border rounded-md"
//                             >
//                                 <option value="" disabled>Select Risk</option>
//                                 {risks.map((risk) => (
//                                     <option key={risk._id} value={risk._id}>{risk.risk_code}</option>
//                                 ))}
//                             </select>
//                             <Input name="actions" placeholder="Actions" value={newMitigation.actions} onChange={handleInputChange} required />
//                             <Input name="timeline" placeholder="Timeline" value={newMitigation.timeline} onChange={handleInputChange} required />
//                             <Input name="resources" placeholder="Resources" value={newMitigation.resources} onChange={handleInputChange} required />
//                             <Input name="status" placeholder="Status" value={newMitigation.status} onChange={handleInputChange} required />
//                             <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
//                         </form>
//                     </DialogContent>
//                 </Dialog>

//                 <div className="rounded-md border">
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Risk ID</TableHead>
//                                 <TableHead>Actions</TableHead>
//                                 <TableHead>Timeline</TableHead>
//                                 <TableHead>Resources</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {mitigations.map((mitigation) => (
//                                 <TableRow key={mitigation._id}>
//                                     <TableCell>{mitigation.risk_details?.risk_code}</TableCell>
//                                     <TableCell>{mitigation.actions}</TableCell>
//                                     <TableCell>{mitigation.timeline}</TableCell>
//                                     <TableCell>{mitigation.resources}</TableCell>
//                                     <TableCell>{mitigation.status}</TableCell>
//                                     <TableCell>
//                                         <button onClick={() => handleEdit(mitigation)}><PencilSquareIcon className="h-5 w-5 text-gray-600" /></button>
//                                         <button><TrashIcon className="h-5 w-5 text-black" /></button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>
//             </div>
//         </DashboardLayout>
//     );
// };

// export default MitigationPlan;








'use client';
import React, { useState } from 'react';
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
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const MitigationPlan = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMitigationId, setSelectedMitigationId] = useState(null);
    const [newMitigation, setNewMitigation] = useState({
        risk_id: '',
        actions: '',
        timeline: '',
        resources: '',
        status: ''
    });

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const risks = [
        { _id: '1', risk_code: 'RISK001' },
        { _id: '2', risk_code: 'RISK002' },
        { _id: '3', risk_code: 'RISK003' }
    ];

    const [mitigations, setMitigations] = useState([
        { _id: '1', risk_details: risks[0], actions: 'Action A', timeline: 'Q1 2025', resources: 'Resource X', status: 'Pending' },
        { _id: '2', risk_details: risks[1], actions: 'Action B', timeline: 'Q2 2025', resources: 'Resource Y', status: 'In Progress' },
        { _id: '3', risk_details: risks[2], actions: 'Action C', timeline: 'Q3 2025', resources: 'Resource Z', status: 'Completed' }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setMitigations(mitigations.map(mitigation => mitigation._id === selectedMitigationId ? { ...newMitigation, _id: selectedMitigationId } : mitigation));
        } else {
            setMitigations([...mitigations, { ...newMitigation, _id: (mitigations.length + 1).toString(), risk_details: risks.find(risk => risk._id === newMitigation.risk_id) }]);
        }
        setIsDialogOpen(false);
        setIsEditing(false);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMitigation((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (mitigation) => {
        setIsEditing(true);
        setSelectedMitigationId(mitigation._id);
        setNewMitigation({ ...mitigation, risk_id: mitigation.risk_details?._id });
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setSelectedRiskId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchMitigations();
                setIsDeleteDialogOpen(false);
                setSelectedRiskId(null);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error deleting issue:', error);
        }
    };

    const resetForm = () => {
        setNewMitigation({ risk_id: '', actions: '', timeline: '', resources: '', status: '' });
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Mitigation Plan</h1>
                    <Button onClick={() => { setIsDialogOpen(true); resetForm(); }}>Add Mitigation</Button>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Mitigation" : "Create New Mitigation"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                name="risk_id"
                                value={newMitigation.risk_id}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="" disabled>Select Risk</option>
                                {risks.map((risk) => (
                                    <option key={risk._id} value={risk._id}>{risk.risk_code}</option>
                                ))}
                            </select>
                            <Input name="actions" placeholder="Actions" value={newMitigation.actions} onChange={handleInputChange} required />
                            <Input name="timeline" placeholder="Timeline" value={newMitigation.timeline} onChange={handleInputChange} required />
                            <Input name="resources" placeholder="Resources" value={newMitigation.resources} onChange={handleInputChange} required />
                            <Input name="status" placeholder="Status" value={newMitigation.status} onChange={handleInputChange} required />
                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1">{isEditing ? "Update Risk" : "Create Risk"}</Button>
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

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Risk ID</TableHead>
                                <TableHead>Actions</TableHead>
                                <TableHead>Timeline</TableHead>
                                <TableHead>Resources</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mitigations.map((mitigation) => (
                                <TableRow key={mitigation._id}>
                                    <TableCell>{mitigation.risk_details?.risk_code}</TableCell>
                                    <TableCell>{mitigation.actions}</TableCell>
                                    <TableCell>{mitigation.timeline}</TableCell>
                                    <TableCell>{mitigation.resources}</TableCell>
                                    <TableCell>{mitigation.status}</TableCell>
                                    <TableCell>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(mitigation)}><PencilSquareIcon className="h-5 w-5 text-gray-600" /></button>
                                         <button onClick={() => handleDeleteClick(risk._id)}><TrashIcon className="h-5 w-5 text-black" /></button>
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
