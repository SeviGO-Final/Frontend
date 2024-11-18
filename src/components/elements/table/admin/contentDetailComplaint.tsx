import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ImagePreviewFromAPI from '../../../ImagePreview';
import { ComplaintResponse } from '../../../../types/complaint-type';
import api from '../../../../services/api';


const ComplaintDetail: React.FC = () => {
    const { complaintId } = useParams<{ complaintId: string }>();
    const [complaint, setComplaint] = useState<ComplaintResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/complaints/${complaintId}`)
            .then((response) => {
                setComplaint(response.data.data);
                console.log('Complaint: ', response.data.data);
            })
            .catch((error) => {
                console.error(error.response.errors);
            });
    }, [complaintId]);

    const navigate = useNavigate();
    const handleCreateReport = () => {
        setLoading(true);
        Swal.fire({
            title: 'Sudah Yakin?',
            text: 'Ingin Memberi Feedback?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Beri Feedback',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/admin/complaints/${complaintId}/feedback`);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="p-6 flex-1 bg-white">
            <div className="flex justify-end mb-0 items-center mr-8">
                <i className="bx bxs-user mr-4 bx-md text-orange-400" />
                <h2>Admin2</h2>
            </div>

            <div className="mb-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl text-black font-bold mb-2 whitespace-nowrap">
                        Detail Complaint
                    </h1>
                    <div className="w-full h-px bg-gray-800" />
                </div>
                <p className="text-gray-600 mb-2">Report feed</p>
            </div>
            <div className="flex flex-col">
                <div className="bg-gray-100 rounded-md shadow-lg flex-1 overflow-auto">
                    <div className="w-full bg-gray-300 p-2 rounded-t-md">
                        <h2 className="text-lg font-semibold">
                            Detail Complaint - {complaint?.title || 'No Title'}
                        </h2>
                    </div>
                    <p className="text-xs text-right mr-8 mt-4 text-gray-600">
                        Tanggal Event: {complaint?.date_event
                            ? new Date(complaint.date_event).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })
                            : 'Belum ada tanggal event'}
                    </p>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="category" className="block text-md font-bold text-gray-700">
                                Kategori Laporan
                            </label>
                            <input
                                id="category"
                                type="text"
                                value={complaint?.category?.name || ''}
                                disabled
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-md font-bold text-gray-700">
                                Judul Laporan
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={complaint ?
                                    `${complaint.title} - ${new Date(complaint.date_event).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}`
                                    : ''
                                }
                                disabled
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                            />
                        </div>


                        <div>
                            <label htmlFor="category" className="block text-md font-bold text-gray-700">
                                Lokasi
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={complaint?.location || ''}
                                disabled
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-md font-bold text-gray-">
                                Deskripsi
                            </label>
                            <textarea
                                id="description"
                                disabled
                                value={complaint?.content || ''}
                                className="w-full max-w-md p-2 border text-xs shadow-md border-gray-300 overflow-auto rounded-md bg-gray-50 h-28 resize-none"
                            />
                            <p className="text-xs text-gray-600">
                                Tanggal Masuk Laporan: {complaint?.created_at
                                    ? new Date(complaint.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                    : 'Belum ada tanggal laporan'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Image
                            </label>
                            <div className="bg-gray-100 w-full cursor-pointer max-w-md h-[18vh] flex items-center justify-center shadow-lg text-gray-600 rounded-md">
                                {complaint?.evidence ? (
                                    <ImagePreviewFromAPI
                                        alt='Complaint'
                                        image={complaint.evidence}
                                    />
                                ) : (
                                    "No Image Available"
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                onClick={() => navigate('/admin/complaints')}
                                className="px-6 py-2 bg-[#FF8C42] text-white rounded-md hover:bg-[#ff7a1f] disabled:opacity-50 transition-colors"
                                disabled={loading}
                                type="button"
                            >
                                BACK
                            </button>
                            <button
                                onClick={handleCreateReport}
                                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-2"
                                disabled={loading}
                                type="button"
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Create Feeback
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetail;
