import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import { useComplaintsWithCategories } from "../../../../hooks/history/history";

interface ReportItem {
  id: ReactNode;
  date: string;
  title: string;
  category: string;
  status: boolean;
}

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  const { historyData, error } = useComplaintsWithCategories();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const totalPage = Math.ceil(historyData.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-gray-50 w-1/2 lg:w-full h-4/6 p-4 lg:pb-4 rounded-lg shadow mt-4 ">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-1/3"
          />
        </div>
        <table className="w-full text-left bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border-b">Date</th>
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Type</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border-b">{item.date}</td>
                <td className="p-2 border-b">{item.title}</td>
                <td className="p-2 border-b">{item.category}</td>
                <td className="p-2 border-b">
                  <span
                    className={item.status ? "text-green-500" : "text-red-500"}
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
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-end mt-4">
          <div className="btn-group space-x-4">
            {[...Array(totalPage)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`btn ${
                  currentPage === i + 1 ? "btn-active" : ""
                } px-8`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
