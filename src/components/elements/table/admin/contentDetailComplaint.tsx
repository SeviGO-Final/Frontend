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
            console.log('Creating report for:', initialData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            onBack();
        } catch (error) {
            console.error('Error creating report:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 flex-1 bg-white">
            <div className="flex justify-end items-center mr-8 mb-2">
                <i className="bx bxs-user mr-4 bx-md text-orange-400" />
                <h2>Admin2</h2>
            </div>

            <div className="mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl text-black font-bold mb-2 whitespace-nowrap">
                        Detail Complaint
                    </h1>
                    <div className="w-full h-px bg-gray-800" />
                </div>
                <p className="text-gray-600">Report feed</p>
            </div>

            <div className="flex flex-col h-[calc(77vh-1rem)] overflow-auto">
                <div className="bg-gray-200 h-full rounded-md shadow-sm">
                    <div className="w-full bg-gray-300 p-4 rounded-t-md">
                        <h2 className="text-xl font-semibold">
                            Detail Complaint - {initialData.title}
                        </h2>
                    </div>

                    <div className="p-5 space-y-4 overflow-auto">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">
                                Title Report
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={initialData.title}
                                disabled
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-bold overflow-y-auto text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                disabled
                                value={initialData.description}
                                className="w-full p-2 border border-gray-200 rounded-md bg-gray-50 h-24 resize-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                            </label>
                            <div className="bg-gray-100 w-full max-w-md h-40 flex items-center justify-center text-gray-500 rounded-md">
                                {initialData.image ? (
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

                        <div className="flex justify-between pt-4 space-x-4">
                            <button
                                onClick={onBack}
                                className="px-4 py-2 bg-[#FF8C42] text-white rounded-md hover:bg-[#ff7a1f] disabled:opacity-50 transition-colors"
                                disabled={loading}
                                type="button"
                            >
                                BACK
                            </button>
                            <button
                                onClick={handleCreateReport}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
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
    );

};

export default ComplaintDetail;