import Table from "../../components/elements/table/admin/userTable";

const UserManagement = () => {
  return (
    <>
      <div className="flex space-x-4">
        <div className="m-4 w-full">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">User Mangement</h1>
            <hr className="border border-black w-3/4" />
          </div>
          <Table />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
