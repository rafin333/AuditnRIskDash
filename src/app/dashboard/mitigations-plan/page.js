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
        userId: '67c8073dccbdec04882477ba'
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxNTkwMTU5LCJleHAiOjE3NDE2NzY1NTl9.Gd0pMRZ9RS9Xrrz_9SzrzoWyhBXLFmgGD4xgOuVXSLY";

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

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    risk_id: newMitigation.risk_id,
                    mitigation_actions: newMitigation.actions,
                    mitigation_timeline: newMitigation.timeline,
                    resources: newMitigation.resources,
                    mitigation_status: newMitigation.status,
                    mitigation_userId: newMitigation.userId
                })
            });

            if (response.ok) {
                fetchMitigations();
                resetDialog();
            } else {
                // Handle error response
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
            userId: '67c8073dccbdec04882477ba'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMitigation(prev => ({ ...prev, [name]: value }));
    };

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
                            userId: '67c8073dccbdec04882477ba'
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
                            <Input
                                name="actions"
                                placeholder="Mitigation Actions"
                                value={newMitigation.actions}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="timeline"
                                placeholder="Mitigation Timeline"
                                value={newMitigation.timeline}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="resources"
                                placeholder="Resources"
                                value={newMitigation.resources}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="status"
                                placeholder="Mitigation Status"
                                value={newMitigation.status}
                                onChange={handleInputChange}
                                required
                            />

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1">
                                    {isEditing ? "Update Mitigation" : "Create Mitigation"}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setIsDialogOpen(false)}
                                    variant="destructive"
                                >
                                    Close
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
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



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> v1.2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// _________________________________________________________________________________________


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
//     DialogBody,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger
// } from '@/components/ui/dialog';
// import Button from '@/components/ui/Button';
// import Input from '@/components/ui/Input';
// import DashboardLayout from '@/components/layout/DashboardLayout';
// import Textarea from '@/components/ui/textarea';
// import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

// const MitigationPlan = () => {
//     const [risk, setRisk] = useState([]);
//     const [owners, setOwners] = useState([]);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [selectedMitigationId, setSelectedMitigationId] = useState(null);
//     const [selectedRiskId, setSelectedRiskId] = useState(null);
//     const [newMitigation, setNewMitigation] = useState({
//         risk_id: '',
//         actions: '',
//         timeline: '',
//         resources: '',
//         status: '',
//         userId: ''
//     });

//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M4MDczZGNjYmRlYzA0ODgyNDc3YmEiLCJlbWFpbCI6InJhZmluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImFjbCI6WyJyaXNrLCBtaXRpZ2F0aW9uLCByZXBvcnQsIGxvZ2dpbmciXSwiaWF0IjoxNzQxMTYyMzczLCJleHAiOjE3NDEyNDg3NzN9.pv6nCTrBskeXbWzdg6rpZpqOjd7YvHGMFJvY-wRxY2g";

//     useEffect(() => {
//         fetchMitigations();
//         fetchRisk();
//     }, []);

//     const fetchRisk = async () => {
//         try {
//             const response = await fetch('http://202.4.109.211:5050/api/risk', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();
//             if (Array.isArray(data)) {
//                 setRisk(data);
//             } else {
//                 setRisk([]);
//             }
//         } catch (error) {
//             console.error('Error fetching risks:', error);
//             setRisk([]);
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
//                 setNewMitigation({
//                     risk_id: '',
//                     actions: '',
//                     timeline: '',
//                     resources: '',
//                     status: '',
//                     userId: ''
//                 });
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

//     const [mitigation, setMitigations] = useState([]);

//     useEffect(() => {
//         fetchMitigations();
//     }, []);

//     const fetchMitigations = async () => {
//         try {
//             const response = await fetch('http://202.4.109.211:5050/api/mitigation', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();
//             if (Array.isArray(data)) {
//                 setMitigations(data);
//             } else {
//                 setMitigations([]);
//             }
//         } catch (error) {
//             console.error('Error fetching mitigation:', error);
//             setMitigations([]);
//         }
//     };

//     const handleEdit = (risk) => {
//         setIsEditing(true);
//         setSelectedMitigationId(mitigation._id);
//         setNewMitigation({
//             risk_id: risk._id,
//             actions: mitigation.mitigation_actions,
//             timeline: mitigation.mitigation_timeline,
//             probability: mitigation.probability,
//             resources: mitigation.resources,
//             status: mitigation.mitigation_status,
//             userId: mitigation.mitigation_userId,
//         });
//         setIsDialogOpen(true);
//     };

//     const handleDeleteClick = (id) => {
//         setSelectedMitigationId(id);
//         setIsDeleteDialogOpen(true);
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             const response = await fetch(`http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });

//             if (response.ok) {
//                 fetchMitigations();
//                 setIsDeleteDialogOpen(false);
//                 setSelectedMitigationId(null);
//                 setIsEditing(false);
//             }
//         } catch (error) {
//             console.error('Error deleting mitigation:', error);
//         }
//     };

//     const resetForm = () => {
//         setNewMitigation({
//             risk_id: '',
//             actions: '',
//             timeline: '',
//             resources: '',
//             status: '',
//             userId: ''
//         });
//     };

//     return (
//         <DashboardLayout>
//             <div className="p-8">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">Mitigation Plan</h1>
//                     <Button onClick={() => { setIsDialogOpen(true); resetForm(); }}>Add Mitigation</Button>
//                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                         <DialogContent className="sm:max-w-[425px]">
//                             <DialogHeader>
//                                 <DialogTitle>{isEditing ? "Edit Mitigation" : "Create New Mitigation"}</DialogTitle>
//                             </DialogHeader>
//                             <form onSubmit={handleSubmit} className="space-y-4">
//                                 <div>
//                                     <select
//                                         name="risk_id"
//                                         value={newMitigation.risk_id}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 border rounded-md"
//                                     >
//                                         <option value="" disabled defaultValue className="text-gray-400">Select Risk</option>
//                                         {risk.map((risk) => (
//                                             <option key={risk._id} value={risk._id}>
//                                                 {risk.risk_code}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <Input
//                                         name="mitigation_actions"
//                                         placeholder="Actions"
//                                         value={newMitigation.mitigation_actions}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <Input
//                                         name="mitigation_timeline"
//                                         placeholder="Timeline"
//                                         value={newMitigation.mitigation_timeline}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <Input
//                                         name="resources"
//                                         placeholder="Resources"
//                                         value={newMitigation.resources}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <Input
//                                         name="status"
//                                         placeholder="Status"
//                                         value={newMitigation.status}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                 </div>

//                                 <div className="flex gap-4">
//                                     <Button type="submit" className="flex-1">{isEditing ? "Update Mitigation" : "Create Mitigation"}</Button>
//                                     <button
//                                         onClick={() => setIsDialogOpen(false)}
//                                         className="px-4 py-2 bg-red-500 text-white rounded h-10 text-sm"
//                                     >
//                                         Close
//                                     </button>
//                                 </div>

//                             </form>

//                         </DialogContent>
//                     </Dialog>
//                 </div>

//                 <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//                     <DialogContent className="sm:max-w-[400px]">
//                         <DialogHeader>
//                             <DialogTitle>Confirm Delete</DialogTitle>
//                         </DialogHeader>

//                         <DialogBody>
//                             <p>Are you sure you want to delete this mitigation? This action cannot be undone.</p>
//                         </DialogBody>

//                         <DialogFooter className="flex justify-end gap-4">

//                             <Button
//                                 onClick={() => setIsDeleteDialogOpen(false)}
//                                 style={{
//                                     backgroundColor: '#f3f4f6',
//                                     color: 'black',
//                                     transition: 'background-color 0.3s ease'
//                                 }}
//                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#48bb78'}
//                                 onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={handleDeleteConfirm}
//                                 style={{
//                                     backgroundColor: '#f3f4f6',
//                                     color: 'black',
//                                     transition: 'background-color 0.3s ease'
//                                 }}
//                                 onMouseEnter={(e) => e.target.style.backgroundColor = '#e53e3e'}
//                                 onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
//                             >
//                                 Delete
//                             </Button>

//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>

//                 <div className="rounded-md border">
//                     <Table>
//                         <TableHeader>
//                             <TableRow>

//                                 <TableHead>Risk ID</TableHead>
//                                 <TableHead>actions</TableHead>
//                                 <TableHead>timeline</TableHead>
//                                 <TableHead>resources</TableHead>
//                                 <TableHead>status</TableHead>
//                                 <TableHead>date</TableHead>
//                                 <TableHead>actions</TableHead>

//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {mitigation.map((mitigation) => (
//                                 <TableRow key={mitigation._id}>

//                                     <TableCell>{mitigation.risk_id}</TableCell>
//                                     <TableCell>{mitigation.actions}</TableCell>
//                                     <TableCell>{mitigation.timeline}</TableCell>
//                                     <TableCell>{mitigation.resources}</TableCell>
//                                     <TableCell>{mitigation.status}</TableCell>
//                                     <TableCell>{new Date(mitigation.date).toLocaleDateString()}</TableCell>
//                                     <TableCell>
//                                         <div className="flex gap-2">
//                                             <button onClick={() => handleEdit(mitigation)}><PencilSquareIcon className="h-5 w-5 text-gray-600" /></button>
//                                             <button onClick={() => handleDeleteClick(mitigation._id)}><TrashIcon className="h-5 w-5 text-black" /></button>
//                                         </div>
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






// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> v1.2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// _________________________________________________________________________________________



// 'use client';
// import React, { useState } from 'react';
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

//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//     const risks = [
//         { _id: '1', risk_code: 'RISK001' },
//         { _id: '2', risk_code: 'RISK002' },
//         { _id: '3', risk_code: 'RISK003' }
//     ];

//     const [mitigations, setMitigations] = useState([
//         { _id: '1', risk_details: risks[0], actions: 'Action A', timeline: 'Q1 2025', resources: 'Resource X', status: 'Pending' },
//         { _id: '2', risk_details: risks[1], actions: 'Action B', timeline: 'Q2 2025', resources: 'Resource Y', status: 'In Progress' },
//         { _id: '3', risk_details: risks[2], actions: 'Action C', timeline: 'Q3 2025', resources: 'Resource Z', status: 'Completed' }
//     ]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isEditing) {
//             setMitigations(mitigations.map(mitigation => mitigation._id === selectedMitigationId ? { ...newMitigation, _id: selectedMitigationId } : mitigation));
//         } else {
//             setMitigations([...mitigations, { ...newMitigation, _id: (mitigations.length + 1).toString(), risk_details: risks.find(risk => risk._id === newMitigation.risk_id) }]);
//         }
//         setIsDialogOpen(false);
//         setIsEditing(false);
//         resetForm();
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewMitigation((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEdit = (mitigation) => {
//         setIsEditing(true);
//         setSelectedMitigationId(mitigation._id);
//         setNewMitigation({ ...mitigation, risk_id: mitigation.risk_details?._id });
//         setIsDialogOpen(true);
//     };

//     const handleDeleteClick = (id) => {
//         setSelectedRiskId(id);
//         setIsDeleteDialogOpen(true);
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             const response = await fetch(`http://202.4.109.211:5050/api/mitigation/${selectedMitigationId}`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });

//             if (response.ok) {
//                 fetchMitigations();
//                 setIsDeleteDialogOpen(false);
//                 setSelectedRiskId(null);
//                 setIsEditing(false);
//             }
//         } catch (error) {
//             console.error('Error deleting issue:', error);
//         }
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
//                             <div className="flex gap-4">
//                                 <Button type="submit" className="flex-1">{isEditing ? "Update Risk" : "Create Risk"}</Button>
//                                     <button
//                                         onClick={() => setIsDialogOpen(false)}
//                                         className="px-4 py-2 bg-red-500 text-white rounded h-10 text-sm"
//                                     >
//                                         Close
//                                     </button>
//                                 </div>
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
//                                     <div className="flex gap-2">
//                                         <button onClick={() => handleEdit(mitigation)}><PencilSquareIcon className="h-5 w-5 text-gray-600" /></button>
//                                          <button onClick={() => handleDeleteClick(risk._id)}><TrashIcon className="h-5 w-5 text-black" /></button>
//                                     </div>
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