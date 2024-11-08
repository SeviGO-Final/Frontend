import { useLocation } from "react-router-dom";
import Logo from "../../../assets/image/logo-SeviGO.png";
import AdminSideBar from "../Sidebar/Admin";
import UserSidebar from "./User";
const SideBar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin-panel");

  return (
    <>
      <div className="bg-orange-400 flex flex-col w-1/5 h-screen text-white">
        <div className="flex flex-row items-center space-x-4 mt-4 ml-8">
          <img
            src={Logo}
            alt=""
            className="border border-yellow-400 rounded-full w-12"
          />
          <h1 className="text-3xl font-bold">SeviGo</h1>
        </div>
        {isAdmin ? <AdminSideBar /> : <UserSidebar />}
      </div>
    </>
  );
};

export default SideBar;
