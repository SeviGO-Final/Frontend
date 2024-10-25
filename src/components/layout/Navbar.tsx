import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo-no-bg.png";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 mt-4 px-8 w-full h-14 flex justify-between items-center bg-white shadow-md rounded-full">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="SeviGo"
            className="h-20 w-20 mr-2 rounded-full"
          />
          <span className="text-3xl font-bold text-gray-900 mb-2">SeviGo</span>
        </div>
        <div className="flex items-center space-x-4 text-md ">
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Fitur
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Informasi
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            FAQ
          </a>
          <Link to={"/register"}>
            <a href="#" className="text-gray-900 hover:text-orange-500">
              Register
            </a>
          </Link>
          <Link to="/login">
            <button className="bg-orange-500 font-bold text-lg text-slate-100 w-full px-4 rounded-lg hover:bg-orange-600 hover:text-slate-50 duration-700 ">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
