import React, { useState } from 'react';

interface ComplaintData {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface ComplaintDetailProps {
    initialData: ComplaintData;
    onBack: () => void;
}

const ComplaintDetail: React.FC<ComplaintDetailProps> = ({
    initialData,
    onBack
}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateReport = async (): Promise<void> => {
        try {
            setLoading(true);
            // Add your report creation logic here
            console.log('Creating report for:', initialData);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            onBack(); // Go back to list after successful creation
        } catch (error) {
            console.error('Error creating report:', error);
        } finally {
            setLoading(false);
        }
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
                <div className="bg-gray-400 bg-opacity-30 p-6 h-[calc(88vh-4rem)] overflow-auto rounded-lg flex flex-col">
                    <div className="bg-white rounded-md shadow-lg flex-1 overflow-auto">
                        <div className="w-full bg-gray-300 p-2 rounded-t-md">
                            <h2 className="text-lg font-semibold">
                                Detail Complaint - {initialData?.title || 'No Title'}
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-md font-bold text-gray-700">
                                    Title Report
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={initialData?.title || ''}
                                    disabled
                                    className="w-full p-2 border border-gray-200 rounded-md bg-gray-50"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-md font-bold text-gray-">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    disabled
                                    value={initialData?.description || ''}
                                    className="w-full max-w-md p-2 border text-xs  shadow-md border-gray-300 overflow-auto rounded-md bg-gray-50 h-28 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                    Image
                                </label>
                                <div className="bg-gray-100 w-full cursor-pointer max-w-md h-[18vh] flex items-center justify-center shadow-lg text-gray-600 rounded-md">
                                    {initialData?.image ? (
                                        <img
                                            src={initialData.image}
                                            alt="Complaint"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    ) : (
                                        "No Image Available"
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    onClick={onBack}
                                    className="px-6 py-2 bg-[#FF8C42] text-white rounded-md hover:bg-[#ff7a1f] disabled:opacity-50 transition-colors"
                                    disabled={loading}
                                    type="button"
                                >
                                    BACK
                                </button>
                                <button
                                    onClick={handleCreateReport}
                                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
                                    disabled={loading}
                                    type="button"
                                >
                                    {loading ? 'Creating...' : 'CREATE REPORT'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetail;