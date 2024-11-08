import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HistoryItem {
  id: ReactNode;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attachment: string | null;
}
const HistoryTable = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fungsi untuk mengambil data dari localStorage
  const loadHistoryData = () => {
    const data = localStorage.getItem("history");
    if (data) {
      try {
        // Parsing data dan set ke state
        const parsedData: HistoryItem[] = JSON.parse(data);
        setHistoryData(parsedData);
      } catch (error) {
        console.error("Failed to parse history data:", error);
      }
    }
  };
  useEffect(() => {
    loadHistoryData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData = historyData.filter(
    (item) =>
      item.id?.toString().includes(searchQuery) ||
      item.title.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="w-3/4">
        <div className="flex justify-end items-center mr-8 py-4">
          <div className="flex items-center">
            <i className="bx bxs-user mr-4 bx-md text-orange-400" />
            <h2>Hi, User!</h2>
          </div>
        </div>
        <div className="flex items-center pb-8">
          <h1 className="py-4 ml-8 text-3xl">Riwayat Pelaporan</h1>
          <hr className="border border-black w-2/3 " />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow ml-8 h-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-1/3"
              value={searchQuery}
              onChange={handleSearch}
            />
            <select className="p-2 border rounded">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="overflow-y-auto h-1/2">
            <table className="w-full text-left bg-white rounded-lg shadow-md">
              <thead>
                <tr className="sticky top-0 bg-gray-200">
                  <th className="p-2 border-b">ID Report</th>
                  <th className="p-2 border-b">Category</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.status}</td>
                      <td className="p-2 border-b">
                        <Link to={`/dashboard/view/${item.id}`}>
                          <button className="bg-orange-500 text-white px-4 py-1 rounded">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-8 py-4 text-center">No history found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTable;
