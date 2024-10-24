import Logo from "../../../assets/image/logo SeviGO.png";
import AdminSideBar from "./admin";
const SideBar = () => {
  return (
    <>
      <div className="bg-orange-400 flex flex-col justify-start w-1/5 h-screen text-white">
        <div className="flex flex-row items-center space-x-4 mt-4 ml-4">
          <img
            src={Logo}
            alt=""
            className="border border-yellow-400 rounded-full w-20"
          />
          <h1 className="text-4xl font-bold">SeviGo</h1>
        </div>
        <AdminSideBar />
      </div>
    </>
  );
};

export default SideBar;
