import SideBar from "../../elements/sidebar/sidebar";

const DashboardAdmin = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="">
          <h1>Dashboard</h1>
          <hr className="w-1/2 border border-black" />
          <i className="bx bxs-user border border-red-500 text-orange-400 text-4xl mt-4 mr-4"></i>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
