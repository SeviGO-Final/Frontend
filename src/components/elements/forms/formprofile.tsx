import React, { useEffect, useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";
import ImagePreview from "../ImagePreview";

interface UserData {
  _id: string,
  nik: string,
  name: string,
  email: string,
  role: string;
  is_verified: boolean;
  avatar: File | null;
  address: string;
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}

const FormProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [axiosError, setAxiosError] = useState<string | [] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    nik: "",
    name: "",
    email: "",
    role: "",
    is_verified: false,
    avatar: null,
    address: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  })

  //Get Data Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("users/profile");
        if (response.data.code === 200 && response.data.status === "OK") {
          setUserData(response.data.data);
          console.log("Data: ", response.data.data);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetch: ", error);
      }
    };
    fetchProfile();
  }, []);

  // Clean up preview image
  useEffect(() => {
    if (!preview) return;
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const avatar = e.target.files[0];
    setUserData((prevData) => {
      return {
        ...prevData, avatar: avatar,
      }
    });

    // preview image
    if(avatar) {
      const imageUrl = URL.createObjectURL(avatar);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", userData.name);
    formPayload.append("email", userData.email);
    formPayload.append("address", userData.address);
    if (userData.old_password) formPayload.append("old_password", userData.old_password);
    if (userData.new_password) formPayload.append("new_password", userData.new_password);
    if (userData.confirm_password) formPayload.append("confirm_password", userData.confirm_password);
    if (userData.avatar) formPayload.append("avatar", userData.avatar);

    for (const [key, value] of formPayload.entries()) {
      console.log(`${key}:`, value);
    }

    api.put("/users/profile", formPayload)
      .then((response) => {
        console.log("Response: ", response.data.data);
        setUserData(response.data.data);
        setIsModalOpen(true);        
      })
      .catch((err) => {
        const errorMessage = err.response.data.errors;
        console.log("Error updating profile: ", errorMessage);
        setAxiosError(errorMessage);
        setIsModalOpen(true);
      });  
  };

  const handleCancel = () => {};
  const closeModal = () => {
    setAxiosError(null);
    setIsModalOpen(false);
  }
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
              <div className="border border-gray-300 rounded-full p-1 mt-4 text-gray-300">
                {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-96 h-96 rounded-full object-cover"/>
                ) : (
                <ImagePreview
                  alt={`${userData.name.toLocaleLowerCase().split(" ").join("-")}-avatar`}
                  avatar={userData.avatar}
                />)}
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
                disable={true}
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
                    value={userData.old_password || ""}
                    onChange={handleInputChange}
                  />
                  <TextInput
                    name="new_password"
                    placeholder="New Password"
                    value={userData.new_password || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <TextInput
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={userData.confirm_password || ""}
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
              message={axiosError ? axiosError : "Pembaharuan tersimpan"}
            />
          </div>
        </form>        
      </div>
    </>
  );
};

export default FormProfile;