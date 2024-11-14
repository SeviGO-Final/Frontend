import React from "react";
import SideBar from "../../components/elements/Sidebar/sidebar.tsx";

const DashboardAdmin: React.FC = () => {
  
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="m-4">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="flex space-x-8">
            <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg ">
              <i className="bx bxs-user text-6xl text-orange-400"></i>
              <div className="ml-12 pr-8">
                <h1 className="font-bold text-xl">User</h1>
                <p>1.587</p>
              </div>
            </div>
            <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg ">
              <i className="bx bxs-report text-6xl text-orange-400"></i>
              <div className="ml-12 pr-8">
                <h1 className="font-bold text-xl">Laporan Masuk</h1>
                <p>1.587</p>
              </div>
            </div>
            <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg ">
              <i className="bx bx-list-check text-6xl text-orange-400"></i>
              <div className="ml-12 pr-8">
                <h1 className="font-bold text-xl">Laporan Selesai</h1>
                <p>1.587</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
