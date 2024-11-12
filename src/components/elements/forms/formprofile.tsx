import { useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
interface Profile {
  name: string;
  nik: string;
  email: string;
  password: string;
  number: string;
  address: string;
}
const FormProfile = () => {
  const [formData, setFormData] = useState<Profile>({
    name: "",
    nik: "",
    email: "",
    password: "",
    number: "",
    address: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    setFormData({
      name: "",
      nik: "",
      email: "",
      password: "",
      number: "",
      address: "",
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachment: e.target.files![0],
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ambil data dari localStorage
    const profile = JSON.parse(localStorage.getItem("profile") || "[]");
    // Tambahkan formData ke history
    profile.push(profile);
    // Simpan data yang diperbarui ke localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    setIsModalOpen(true);
    setFormData({
      name: "",
      nik: "",
      email: "",
      password: "",
      number: "",
      address: "",
    });
  };

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
          className="bg-gray-100 p-4 mx-8 h-3/4 rounded-lg"
        >
          <div className="bg-slate-200 py-2 flex justify-center rounded-lg ">
            <h1>Your Profile</h1>
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="flex flex-col space-y-4 w-1/2">
              <TextInput
                name="nik"
                placeholder="NIK"
                value={formData.nik}
                onChange={handleChange}
              />
              <TextInput
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
              />
              <TextInput
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextInput
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextArea
                name="address"
                placeholder="Alamat"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <label className="w-1/2 flex flex-col items-center cursor-pointer">
              <div className="flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-lg p-16 mt-4 text-gray-300">
                <i className="bx bx-user text-6xl "></i>
                <span className="flex flex-col text-xs text-center">
                  Please upload a JPG, PNG, or JPEG image.{" "}
                  <span>Keep the file size under 2MB.</span>
                </span>
              </div>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
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
              message="Data telah disimpan ke local storage."
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProfile;
