import React, { useEffect, useState } from "react";
import ComplaintBarChart from "../../components/barChart";
import api from "../../services/api";

interface Category {
  _id: string;
  name: string;
  has_complaints: number;
  percentage: string;
}

interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: {
    totalComplaints: number;
    categoryPercentages: Category[];
  };
}

const DashboardAdmin: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loadingChart, setLoadingChart] = useState<boolean>(true); // Status loading untuk chart
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/statistics/category-percentages");
      const responseData: ApiResponse = response.data;
      if (responseData.code === 200) {
        setData(responseData);
      } else {
        setError('Error fetching data');
      }
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoadingChart(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col m-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bxs-user text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">User</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bxs-report text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">Laporan Masuk</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bx-list-check text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">Laporan Selesai</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4 w-full">
        <h1 className="text-xl font-semibold mb-4">Complaint Data</h1>
        {loadingChart ? (
          <div className="w-full h-72 bg-gray-200 rounded-lg animate-pulse">
          </div>
        ) : (
          data && <ComplaintBarChart data={data} />
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
