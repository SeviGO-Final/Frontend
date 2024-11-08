import { Link } from "react-router-dom";
interface LinkProps {
  icon: string;
  label: string;
  to: string;
}
const LinkSideBar = ({ label, icon, to }: LinkProps) => {
  return (
    <>
      <Link to={to} className="text-black font-medium">
        <div className="bg-white flex flex-row items-center mt-4 mx-4 p-2 space-x-4 rounded-xl hover:bg-slate-50 hover:-translate-y-2 duration-700">
          <div className="text-orange-400 text-4xl">
            <i className={icon}></i>
          </div>
          <p>{label}</p>
        </div>
      </Link>
    </>
  );
};

export default LinkSideBar;
