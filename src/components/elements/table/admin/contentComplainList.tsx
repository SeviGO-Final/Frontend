import React, { useState } from 'react';

interface Complaint {
    id: string;
    type: string;
    name: string;
    phone: string;
}

const ComplaintList: React.FC = () => {
    const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const complaints: Complaint[] = [
        { id: '8522246001570940', type: 'fasilitas', name: 'sample 123456', phone: '081234567890' },

        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'lebron', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
        { id: '8522246001570940', type: 'Layanan', name: 'jhon doe', phone: '081234567890' },
    ];

    const filteredComplaints = complaints.filter(
        (complaint) =>
            complaint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.id.includes(searchQuery)
    );

    return (
        <div className="p-6 flex-1 bg-white">
            {/* Header */}
            <div className="flex justify-end items-center mr-8">
                <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
                <h2>Admin2</h2>
            </div>
            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl text-black font-bold mb-2 whitespace-nowrap">Complaint List</h1>
                    <div className="w-full h-px bg-gray-800"></div>
                </div>

                <p className="text-gray-600">Report feed</p>
            </div>

            <div className="flex flex-col h-[calc(90vh-theme(spacing.32))]">
                <div className="bg-[#C5C5C5] bg-opacity-30 p-6 rounded-lg flex flex-col flex-grow">
                    {/* Search and Entries Controls */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input input-bordered w-full sm:w-64 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <select
                                className="select select-bordered w-24 bg-white"
                                value={entriesPerPage}
                                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                            <span className="text-gray-700">Entries per page</span>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="flex-grow relative rounded-md shadow bg-white">
                        <div className="absolute inset-0 flex flex-col">
                            <div className="overflow-x-auto flex-grow">
                                <div className="overflow-y-auto h-full">
                                    <table className="w-full">
                                        <thead className="sticky top-0 bg-gray-50 z-10">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">ID Report</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Type</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Name</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Phone</th>
                                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {complaints.length > 0 ? (
                                                complaints.map((complaint) => (
                                                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                        <td className="px-6 py-4 text-sm text-gray-900">{complaint.id}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">{complaint.type}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">{complaint.name}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">{complaint.phone}</td>
                                                        <td className="px-6 py-4">
                                                            <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                        No complaints found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintList;
