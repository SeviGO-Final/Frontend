import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo SeviGO.png";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 mt-8 px-8 w-full flex justify-between items-center bg-white shadow-md rounded-full">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="SeviGo"
            className="h-20 w-20 mr-2 rounded-full"
          />
          <span className="text-4xl font-bold text-gray-900">SeviGo</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Fitur
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Informasi
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            FAQ
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Register
          </a>
          <Link to="/login">
            <button className="bg-orange-500 px-8 py-2 rounded-lg hover:bg-orange-600 duration-700 font-bold text-xl text-black">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
