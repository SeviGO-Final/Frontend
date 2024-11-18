import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ComplaintBarChart from "../../components/barChart";
import StatsCard from "../../components/StatsCard";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdTimer } from "react-icons/io";

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
  const [loadingChart, setLoadingChart] = useState<boolean>(true);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <StatsCard
          title="Total Pengguna"
          icon={<FaUsers />}
          endpoint="/statistics/users"
        />
        <StatsCard
          title="Total Laporan"
          icon={<FaFileAlt />}
          endpoint="/statistics/complaints"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <StatsCard
          title="Laporan Di Terima"
          icon={<AiOutlineCheckCircle />}
          endpoint="/statistics/complaints-accepted"
        />
        <StatsCard
          title="Laporan Di Tolak"
          icon={<AiOutlineCloseCircle />}
          endpoint="/statistics/complaints-rejected"
        />
        <StatsCard
          title="Laporan Di Proses"
          icon={<IoMdTimer />}
          endpoint="/statistics/complaints-processing"
        />
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
