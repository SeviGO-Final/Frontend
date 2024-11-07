import SideBar from "../../components/elements/Sidebar/sidebar";
import { Link } from "react-router-dom";
import Table from "../../components/elements/table/user/table";
const DashboardUser = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-3/4 flex flex-col">
          <h1 className="m-4 my-8 text-4xl">Dashboard</h1>
          <div className="flex items-center justify-center space-x-4 ">
            <Link to={"/dashboard/new-report"}>
              <div className="bg-slate-50 flex items-center py-8 px-20 text-2xl space-x-4 rounded-lg shadow-sm">
                <i className="bx bxs-notepad text-orange-500 text-6xl" />
                <h1>Buat Pengaduan</h1>
              </div>
            </Link>
            <Link to={"/dashboard/history"}>
              <div className="bg-slate-50 flex items-center p-8 text-2xl space-x-4 rounded-lg shadow-sm">
                <i className="bx bx-history text-orange-500 text-6xl" />
                <h1>Riwayat Pengaduan</h1>
              </div>
            </Link>
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};

export default DashboardUser;
