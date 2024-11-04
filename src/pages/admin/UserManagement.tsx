import SideBar from "../../components/elements/Sidebar/sidebar";
import Table from "../../components/elements/table/admin/table";

const UserManagement = () => {
  return (
    <>
      <div className="flex space-x-4">
        <SideBar />
        <div className="m-4 w-3/4">
          <h1 className="text-3xl font-bold mb-6">User Mangement</h1>
          <Table />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
