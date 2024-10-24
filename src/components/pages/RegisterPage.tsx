import React, { useState, ChangeEvent, FormEvent } from "react";
import backgroundImage from "../../assets/image/login-bg.jpg";
import "boxicons/css/boxicons.min.css";
import logoSevigo from "../../assets/image/logo SeviGO.png";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // Handle login logic here
      console.log("Login submitted:", formData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Container untuk logo dan card */}
      <div className="flex flex-col items-center">
        {/* ini untuk Logo */}
        <div className="flex flex-row items-center mb-4">
          <img
            src={logoSevigo}
            alt="Sevigo Logo"
            className="mb-2"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <h1
            className="mb-2 ml-4 text-2xl font-bold "
            style={{ color: "white", fontSize: "50px" }}
          >
            SeviGo
          </h1>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* ini untuk Card container */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all duration-300 hover:scale-105">
          {/* Form Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign Up
          </h2>

          {/* ini untuk Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <i className="bx bx-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-hover:text-orange-500 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="NIK"
                required
                aria-label="NIK"
              />
            </div>
            <div className="relative group">
              <i className="bx bx-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-hover:text-orange-500 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="Email"
                required
                aria-label="Name"
              />
            </div>
            <div className="relative group">
              <i className="bx bx-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-hover:text-orange-500 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="Email"
                required
                aria-label="Email address"
              />
            </div>

            <div className="relative group">
              <i className="bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-hover:text-orange-500 transition-colors duration-300" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="Password"
                required
                aria-label="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              aria-label="Login"
            >
              <span>LOGIN</span>
              <i className="bx bx-right-arrow-alt text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
          <div className="w-full h-[1px] bg-gray-200 mt-9 mb-0"></div>
          {/* Sign up link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 inline-flex items-center gap-1"
              aria-label="Sign up"
            >
              Login here
              <i className="bx bx-user-plus text-lg" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
