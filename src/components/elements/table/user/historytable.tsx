import { useState } from "react";
import { Link } from "react-router-dom";
import { useComplaintsWithCategories } from "../../../../hooks/history/history";

const HistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { historyData, error } = useComplaintsWithCategories();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-3/4 lg:w-full">
        <div className="flex items-center pb-8">
          <h1 className="py-4 ml-8 text-3xl">Riwayat Pelaporan</h1>
          <hr className="border border-black w-2/3 " />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow lg:ml-8 h-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-1/3"
              value={searchQuery}
              // onChange={handleSearch}
            />
            <select className="p-2 border rounded">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
          <div className="overflow-y-auto h-96 lg:h-1/2">
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
                {historyData.length > 0 ? (
                  historyData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.date}</td>
                      <td className="p-2 border-b">
                        <span
                          className={
                            item.status ? "text-green-500" : "text-red-500"
                          }
                        >
                          {item.status ? "Accepted" : "Rejected"}
                        </span>
                      </td>
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
