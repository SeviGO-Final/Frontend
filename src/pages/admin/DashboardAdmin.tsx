import React from "react";

const DashboardAdmin: React.FC = () => {
  return (
    <div className="flex flex-col m-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bxs-user text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">User</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>
        
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bxs-report text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">Laporan Masuk</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>
        
        <div className="bg-slate-50 shadow-md flex items-center p-4 rounded-lg">
          <i className="bx bx-list-check text-4xl md:text-6xl text-orange-400"></i>
          <div className="ml-4 md:ml-8">
            <h1 className="font-bold text-lg md:text-xl">Laporan Selesai</h1>
            <p className="text-sm md:text-base">1.587</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
