import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ReportItem {
  id: ReactNode;
  date: string;
  title: string;
  category: string;
  status: boolean;
}

const Table = () => {
  const [report, setReport] = useState<ReportItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const loadData = () => {
    const data = localStorage.getItem("history");
    if (data) {
      try {
        const parsedData: ReportItem[] = JSON.parse(data);
        setReport(parsedData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = report.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const totalPage = Math.ceil(report.length / itemsPerPage);
  return (
    <>
      <div className="bg-gray-50 h-3/5 p-4 rounded-lg shadow mt-4 ">
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
              <th className="p-2 border-b">ID Report</th>
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
                <td className="p-2 border-b">{item.id}</td>
                <td className="p-2 border-b">{item.date}</td>
                <td className="p-2 border-b">{item.title}</td>
                <td className="p-2 border-b">{item.category}</td>
                <td className="p-2 border-b">
                  <span
                    className={
                      item.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {item.status}
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
          <div className="btn-group  space-x-4">
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
