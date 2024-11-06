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
        {
            id: '8522246001570940',
            type: 'fasilitas',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'randi',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
        {
            id: '8522246001570940',
            type: 'Layanan',
            name: 'sample 123456',
            phone: '081234567890',
        },
    ];

    const filteredComplaints = complaints.filter(
        (complaint) =>
            complaint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 flex-1 bg-white">
            <div className="flex justify-end items-center mr-8">
                <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
                <h2>Admin2</h2>
            </div>
            <div className="mb-8">
                <div className="flex items-center">
                    <h1 className="text-3xl text-black font-bold mb-2">Complaint List</h1>
                    <div className="border-t border-gray-700 w-[1020px] ml-4"></div>
                </div>

                <p className="text-gray-600">Report feed</p>
            </div>

            <div className="bg-[#C5C5C5] bg-opacity-30 p-6 rounded-lg h-[700px]">
                <div className="flex justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered w-64 bg-white"
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

                <div className="relative rounded-md shadow bg-white">
                    {/* Fixed Header */}
                    <div className="sticky top-0 z-10 bg-gray-50 rounded-t-lg">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 w-1/5">
                                        ID Report
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 w-1/5">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 w-1/5">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 w-1/5">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 w-1/5">
                                        Detail
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-300px)]">
                        <table className="w-full">
                            <tbody className="divide-y divide-gray-200">
                                {filteredComplaints.map((complaint: Complaint) => (
                                    <tr key={complaint.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 text-sm text-gray-900 w-1/5">{complaint.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 w-1/5">{complaint.type}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 w-1/5">{complaint.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 w-1/5">{complaint.phone}</td>
                                        <td className="px-6 py-4 w-1/5">
                                            <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintList;
