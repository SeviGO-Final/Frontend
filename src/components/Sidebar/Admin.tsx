import LinkSideBar from "./Link/linksidebar";

const AdminSideBar = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <hr className="border border-white opacity-30 w-4/5" />
        <h1 className="text-xl ">Admin Panel</h1>
      </div>
      <LinkSideBar label="Dashboard" to="/dashboard" icon="bx bxs-dashboard" />
      <LinkSideBar
        label="User Management"
        to="/admin-panel/user-management"
        icon="bx bxs-user"
      />
      <LinkSideBar
        label="Complaint List"
        to="/complaint-list"
        icon="bx bx-list-ul"
      />
    </>
  );
};

export default AdminSideBar;
