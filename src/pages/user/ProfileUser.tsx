import FormProfile from "../../components/elements/forms/formprofile";
import SideBar from "../../components/elements/Sidebar/sidebar";

const ProfileUser = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <FormProfile />
      </div>
    </>
  );
};

export default ProfileUser;
