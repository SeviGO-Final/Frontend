import React, { useEffect, useState } from "react";
import ComplaintDetail from "./contentDetailComplaint";
import classNames from "classnames";
import api from "../../../../services/api";
import { ComplaintResponse } from "../../../../types/complaint-type";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  searchComplaints,
  setComplaintsData,
} from "../../../../Redux/reducer/complaintsSlice";

type Complaints = ComplaintResponse[];
const ComplaintList: React.FC = () => {
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ComplaintResponse | null>(null);
  const [complaints, setComplaints] = useState<Complaints>([]);
  const dispatch: AppDispatch = useDispatch();
  const { filteredData } = useSelector((state: RootState) => state.complaints);
  //get data from database
  useEffect(() => {
    api
      .get("/complaints")
      .then((response) => {
        setComplaints(response.data.data as Complaints);
        console.log("Complaints: ", response.data.data);
      })
      .catch((error) => {
        console.log("Error when get all complaints: ", error);
      });
  }, []);

  useEffect(() => {
    if (complaints) {
      dispatch(setComplaintsData(complaints));
    }
  }, [complaints, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchComplaints(e.target.value));
  };
  // const filteredComplaints = complaints.filter(
  //   (complaint: ComplaintResponse) =>
  //     complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     complaint.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     complaint._id.includes(searchQuery)
  // );

  // const totalPages = Math.ceil(filteredComplaints.length / entriesPerPage);
  // const startIndex = (currentPage - 1) * entriesPerPage;
  // const endIndex = startIndex + entriesPerPage;
  // const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEntriesPerPageChange = (value: number) => {
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  // const handleViewComplaint = (complaint: ComplaintResponse) => {
  //   setSelectedComplaint(complaint);
  // };

  // const renderPaginationButtons = () => {
  //   const buttons = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     buttons.push(
  //       <button
  //         key={i}
  //         onClick={() => handlePageChange(i)}
  //         className={`px-3 py-1 mx-1 rounded ${
  //           currentPage === i
  //             ? "bg-orange-400 text-white"
  //             : "bg-white text-gray-700 hover:bg-gray-100"
  //         }`}
  //       >
  //         {i}
  //       </button>
  //     );
  //   }
  //   return buttons;
  // };

  // if (selectedComplaint) {
  //   return (
  //     <ComplaintDetail
  //       initialData={{
  //         id: selectedComplaint._id,
  //         title: selectedComplaint.title || "No Title",
  //         description: selectedComplaint.content || "No Description",
  //         image: selectedComplaint.evidence || "",
  //       }}
  //       onBack={() => setSelectedComplaint(null)}
  //     />
  //   );
  // }

  return (
    <div className="p-6 flex-1 bg-white">
      <div className="flex justify-end items-center mr-8">
        <i className="bx bxs-user mr-4 bx-md text-orange-400"></i>
        <h2>Admin2</h2>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl text-black font-bold mb-2 whitespace-nowrap">
            Complaint List
          </h1>
          <div className="w-full h-px bg-gray-800"></div>
        </div>
        <p className="text-gray-600">Report feed</p>
      </div>

      <div className="flex shadow-md rounded-lg flex-col h-[calc(90vh-theme(spacing.32))]">
        <div className="bg-[#C5C5C5] bg-opacity-30 p-6 rounded-lg flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full sm:w-64 bg-white"
              onChange={handleSearch}
            />
            <div className="flex items-center gap-2">
              <select
                className="select select-bordered w-24 bg-white"
                value={entriesPerPage}
                onChange={(e) =>
                  handleEntriesPerPageChange(Number(e.target.value))
                }
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-gray-700">Entries per page</span>
            </div>
          </div>

          <div className="flex-grow relative rounded-md overflow-hidden shadow bg-white">
            <div className="absolute inset-0 flex flex-col">
              <div className="overflow-x-auto flex-grow">
                <div className="overflow-y-auto h-full">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gray-300 rounded-t-md z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                          ID Report
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredData.length > 0 ? (
                        filteredData.map((complaint: ComplaintResponse) => (
                          <tr
                            key={complaint._id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {complaint._id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {complaint.category?.name || "Uncategorized"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {complaint.title}
                            </td>
                            <td
                              className={classNames("px-6 py-4 text-sm", {
                                "text-green-500 text-shadow-md":
                                  complaint.current_status === "submitted",
                                "text-orange-500 text-shadow-md":
                                  complaint.current_status === "processing",
                                "text-blue-500 text-shadow-md":
                                  complaint.current_status === "accepted",
                                "text-red-500 text-shadow-md":
                                  complaint.current_status === "rejected",
                              })}
                            >
                              {complaint.current_status === "submitted"
                                ? "Laporan Dibuat"
                                : complaint.current_status === "processing"
                                ? "Laporan Diproses"
                                : complaint.current_status === "accepted"
                                ? "Laporan Disetujui"
                                : complaint.current_status === "rejected"
                                ? "Laporan Ditolak"
                                : "Status Tidak Diketahui"}
                            </td>
                            <td className="px-6 py-4">
                              <Link to={`/admin/complaints/${complaint._id}`}>
                                <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                                  View
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            No complaints found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredComplaints.length)} of{" "}
              {filteredComplaints.length} entries
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
