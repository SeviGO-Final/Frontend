import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../../../Redux/store";
import {
  setHistoryData,
  searchHistory,
} from "../../../../Redux/reducer/historySlice";
import { useComplaintsWithCategories } from "../../../../hooks/history/history";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  const dispatch: AppDispatch = useDispatch();
  const { filteredData } = useSelector((state: RootState) => state.history);
  const { historyData, error } = useComplaintsWithCategories();

  useEffect(() => {
    if (historyData) {
      dispatch(setHistoryData(historyData));
    }
  }, [historyData, dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchHistory(e.target.value));
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian dilakukan
  };

  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="w-[22rem] lg:w-full">
        <div className="bg-gray-50 p-4 rounded-lg shadow lg:ml-8 h-[22rem] lg:h-auto">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded w-3/4 lg:w-1/3"
              onChange={handleSearch}
            />
          </div>
          <div className="overflow-y-auto h-96 lg:h-1/2">
            <table className="w-full text-left bg-white rounded-lg shadow-md">
              <thead>
                <tr className="sticky top-0 bg-gray-200">
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b">Category</th>
                  <th className="p-2 border-b">Status</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.date?.split(",")[0]}</td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2 border-b">
                      <span
                          className={
                            item.status === "submitted"
                              ? "text-blue-500"
                              : item.status === "accepted"
                              ? "text-green-500"
                              : item.status === "processing"
                              ? "text-yellow-500"
                              : item.status === "rejected"
                              ? "text-red-500"
                              : "text-slate-500"
                          }
                        >
                          { item.status }
                          {/* { 
                          item.status === "submitted"
                          ? "Submitted"
                          : item.status === "accepted" 
                          ? "Accepted" 
                          : item.status === "processing"
                          ? "Processing"
                          : "Rejected"
                          } */}
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
        </div>
      </div>
    </>
  );
};

export default Table;
