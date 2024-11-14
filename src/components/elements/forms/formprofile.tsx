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
  });

  //Get Data Profile
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
        console.log("Profle update success");
        setIsModalOpen(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile: ", error.message);
    }
  };
  const handleFileChange = () => {};

  const handleCancel = () => {};
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex flex-col w-3/4 ml-8 ">
        <div className="flex items-center">
          <h1 className="text-4xl mx-8 my-8">Profile</h1>
          <hr className="border border-black w-full" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 mx-4 h-4/5 rounded-lg"
        >
          <div className="bg-slate-200 py-2 flex justify-center rounded-lg ">
            <h1>Your Profile</h1>
            <div className="flex items-center">
              <span
                className={`ml-4 ${
                  userData.is_verified
                    ? "bg-green-500 rounded-lg text-white px-4"
                    : "bg-red-500 rounded-lg text-white px-4"
                }`}
              >
                {userData.is_verified ? "Verified" : "Not verified"}
              </span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <label className="w-1/2 flex flex-col items-center cursor-pointer">
              <div className="flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-full p-20 mt-4 text-gray-300">
                <i className="bx bx-user text-6xl "></i>
              </div>
              <p className="mt-4 w-1/2 flex flex-col text-xs text-center">
                Please upload photo profile a JPG, PNG, or JPEG image.{" "}
                <span>Keep the file size under 2MB.</span>
              </p>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <div className="flex flex-col space-y-2 w-2/3">
              <TextInput
                name="nik"
                placeholder="NIK"
                value={userData.nik}
                onChange={handleInputChange}
                disble={true}
              />
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
              <TextArea
                name="address"
                placeholder="Alamat"
                value={userData.address}
                onChange={handleInputChange}
              />
              <div className="flex space-x-4">
                <div className="space-y-4">
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
                </div>
                <TextInput
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={userData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
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
            <Alert
              isOpen={isModalOpen}
              onClose={closeModal}
              message="Pembaharuan tersimpan"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProfile;
