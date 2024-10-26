import { Link } from "react-router-dom";
interface LinkProps {
  icon: string;
  label: string;
  to: string;
}
const LinkSideBar = ({ label, icon, to }: LinkProps) => {
  return (
    <>
      <div className="bg-white flex flex-row items-center mt-4 mx-4 p-2 space-x-4 rounded-xl">
        <div className="text-orange-400 text-4xl">
          <i className={icon}></i>
        </div>
        <Link to={to} className="text-black font-medium">
          {label}
        </Link>
      </div>
    </>
  );
};

export default LinkSideBar;
