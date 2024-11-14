import React, { useEffect, useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";

interface Profile {
  is_verified: boolean;
  name: string;
  nik: string;
  email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
  number: string;
  address: string;
  classname: string
}

const FormProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<Profile>({
    is_verified: false,
    name: "",
    nik: "",
    email: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
    number: "",
    address: "",
    classname: "",
  });

  // Get Data Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("users/profile");
        if (response.data.code === 200 && response.data.status === "OK") {
          setUserData(response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetch: ", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put("users/profile", userData);
      if (response.data.code === 200 && response.data.status === "OK") {
        console.log("Profile update success");
        setIsModalOpen(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile: ", error.message);
    }
  };

  const handleFileChange = () => { };
  const handleCancel = () => { };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8">
      <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8 mt-4">
        <h1 className="text-2xl mb-4">Your Profile</h1>
        <div className="card w-full bg-base-100 shadow-xl">
          <label className="w-full flex flex-col items-center cursor-pointer">
            <div className="flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-full p-16 mt-4 text-gray-300">
              <i className="bx bx-user text-3xl"></i>
            </div>
            <p className="mt-4 text-xs text-center p-2">
              Please upload a profile photo (JPG, PNG, JPEG).
              <span>Keep the file size under 2MB.</span>
            </p>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="w-full md:w-2/3">
        <div className="bg-slate-200 py-2 flex justify-center rounded-lg mb-6">
          <h1>Your Profile</h1>
          <div className="flex items-center">
            <span
              className={`ml-4 ${userData.is_verified
                ? "bg-green-500 rounded-lg text-white px-4"
                : "bg-red-500 rounded-lg text-white px-4"
                }`}
            >
              {userData.is_verified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
          <h5 className="text-center mb-4">Your NIK: {userData.nik}</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              name="name"
              placeholder="Nama Lengkap"
              value={userData.name}
              onChange={handleInputChange}
            />

            <TextInput
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4">
            <TextArea
              name="address"
              placeholder="Alamat"
              value={userData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TextInput
              name="old_password"
              placeholder="Old Password"
              value={userData.old_password}
              onChange={handleInputChange}
            />
            <TextInput
              name="new_password"
              placeholder="New Password"
              value={userData.new_password}
              onChange={handleInputChange}
            />
            <TextInput
              name="confirm_password"
              placeholder="Confirm Password"
              value={userData.confirm_password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end mt-4 space-x-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              CANCEL
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              UPDATE
            </Button>
          </div>

          <Alert
            isOpen={isModalOpen}
            onClose={closeModal}
            message="Pembaharuan tersimpan"
          />
        </form>
      </div >
    </div >
  );
};

export default FormProfile;
