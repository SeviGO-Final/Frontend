import LinkSideBar from "./Link/linksidebar";

const UserSidebar = () => {
  return (
    <>
      <hr className="border border-white opacity-30 w-4/5 my-4 ml-6" />
      <LinkSideBar label="Dashboard" to="/dashboard" icon="bx bxs-dashboard" />
      <LinkSideBar label="Profile" to="/dashboard/profile" icon="bx bxs-user" />
    </>
  );
};
export default UserSidebar;
