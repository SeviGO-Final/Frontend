import React from "react";
import { ComplaintResponse } from "../../../../../types/complaint-type";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface ComplaintTableProps {
  complaints: ComplaintResponse[];
}

const ComplaintTable: React.FC<ComplaintTableProps> = ({ complaints }) => {
  return (
    <div className="bg-white overflow-x-auto flex-grow rounded-lg">
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
            {complaints.length > 0 ? (
              complaints.map((complaint: ComplaintResponse) => (
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
                      "text-green-500":
                        complaint.current_status === "submitted",
                      "text-orange-500":
                        complaint.current_status === "processing",
                      "text-blue-500": complaint.current_status === "accepted",
                      "text-red-500": complaint.current_status === "rejected",
                    })}
                  >
                    { complaint.current_status }
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
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;
