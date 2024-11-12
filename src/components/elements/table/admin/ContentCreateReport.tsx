import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ComplaintData {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface ReportForm {
    title: string;
    date: string;
    description: string;
    image: File | null;
}

const CreateReport: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const complaintData = location.state?.complaintData as ComplaintData;

    const [form, setForm] = useState<ReportForm>({
        title: complaintData?.title || '',
        date: '',
        description: '',
        image: null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setForm({ ...form, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('date', form.date);
        formData.append('description', form.description);
        if (form.image) {
            formData.append('image', form.image);
        }

        try {
            // mengirim data ke server 
            const response = await fetch('https://example.com/api/reports', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your report has been submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error submitting your report.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Gagal Terhubung ke Server, silahkan coba beberapa saat lagi!',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 flex-1 bg-white h-screen overflow-hidden">
            <div className="flex justify-end items-center mr-2 sm:mr-4 md:mr-8 h-[3vh]">
                <i className="bx bxs-user mr-2 sm:mr-4 text-2xl sm:text-3xl md:text-4xl text-orange-400" />
                <h2 className="text-sm sm:text-base">Admin2</h2>
            </div>
            <div className="h-[11vh]">
                <div className="flex items-center gap-2 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl md:text-2xl text-black font-bold whitespace-nowrap">
                        Create Report
                    </h1>
                    <div className="w-full h-px bg-gray-800" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Report feed</p>
            </div>
            <div className="bg-gray-200 rounded-lg shadow-md h-[85vh] overflow-auto">
                <div className="p-3 sm:p-4 md:p-6">
                    <div className="bg-orange-50 rounded-lg p-3 sm:p-4 md:p-4">
                        <h2 className="text-lg sm:text-md font-semibold mb-4">New Report</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-0.5 lg:mb-1">
                                    Title Report
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full h-8 lg:h-10 text-sm sm:text-base"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Masukkan Judul.."
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-0.5 lg:mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full h-8 lg:h-10 text-sm sm:text-base p-1"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full text-sm sm:text-base p-2 h-20 sm:h-24 md:h-28"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Tulis Deskripsi.."
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-1">
                                    Image
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="image-upload"
                                        accept=".jpg,.png,.jpeg"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <i className="text-2xl sm:text-3xl md:text-4xl mb-2">📁</i>
                                            <p className="text-xs sm:text-sm text-gray-600">
                                                Please Upload A JPG, PNG, Or JPEG Image.
                                                <br className="hidden sm:block" />
                                                Keep The File Size Under 2MB.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 sm:space-x-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-error text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                                    onClick={() => navigate(-1)}
                                >
                                    CANCEL
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success text-white text-xs sm:text-sm px-3 sm:px-4 py-2"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateReport;
