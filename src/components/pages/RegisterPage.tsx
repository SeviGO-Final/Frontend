import React, { useState, ChangeEvent, FormEvent } from "react";
import backgroundImage from "../../assets/image/login-bg.jpg";
import "boxicons/css/boxicons.min.css";
import logoSevigo from "../../assets/image/logo SeviGO.png";
import InputField from "./InputField";
import { Link } from 'react-router-dom';

interface FormData {
  nik: string;
  username: string;
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
<<<<<<< HEAD
    <div className="flex items-center justify-center h-screen" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

=======
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
>>>>>>> 4e61bac512a8d9bb90dda4e33d793031f75943f3
      {/* Container untuk logo dan card */}
      <div className="flex flex-col items-center z-10">
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
            <InputField
              type="text"
              name="NIK"
              value={formData.nik}
              onChange={handleChange}
              placeholder="NIK"
              icon="bx bx-id-card"
              required
              aria-label="NIK"
            />
            <InputField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              icon="bx-user"
              required
              aria-label="Username"
            />
            <InputField
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              icon="bx-envelope"
              onChange={handleChange}
              required
              aria-label="email"
            />

            <InputField
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              icon="bx-lock-alt"
              onChange={handleChange}
              required
              aria-label="password"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              aria-label="Login"
            >
              <span>Sign in</span>
              <i className="bx bx-right-arrow-alt text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
          <div className="w-full h-[1px] bg-gray-200 mt-9 mb-0"></div>
          {/* Sign up link */}
          <p className="text-center mt-6 text-gray-600">
<<<<<<< HEAD
            Already have an account?{' '}
            <Link
              to="/login" // Path yang sesuai untuk halaman login
=======
            Already have an account?{" "}
            <a
              href="#"
>>>>>>> 4e61bac512a8d9bb90dda4e33d793031f75943f3
              className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 inline-flex items-center gap-1"
              aria-label="Sign up"
            >
              Login here
              <i className="bx bx-user-plus text-lg" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
