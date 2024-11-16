import { useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";
interface NewReport {
  title: string;
  content: string;
  date: string;
  location: string;
  category: string;
  evidence: File | string;
}
const FormReport = () => {
  const [formData, setFormData] = useState<NewReport>({
    title: "",
    content: "",
    date: "",
    location: "",
    category: "",
    evidence: "",
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
      title: "",
      content: "",
      date: "",
      location: "",
      category: "",
      evidence: "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const promises = filesArray.map((file) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises)
        .then((base64Files) => {
          setFormData((prev) => ({
            ...prev,
            evidence: [...(prev.evidence || []), ...base64Files], // Tambahkan semua base64 files ke evidence array
          }));
        })
        .catch((error) => console.error("Error reading files:", error));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    const dataWithId = {
      ...formData,
      id: uniqueId,
    };
    // Ambil data dari localStorage
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    // Tambahkan formData ke history
    history.push(dataWithId);
    // Simpan data yang diperbarui ke localStorage
    localStorage.setItem("history", JSON.stringify(history));
    setIsModalOpen(true);
    setFormData({
      title: "",
      content: "",
      date: "",
      location: "",
      category: "",
      evidence: "",
    });
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pb-16 lg:pb-8 px-4 h-3/4 lg:w-full bg-gray-100 rounded-lg"
      >
        <div className="flex flex-col lg:flex-row space-x-4 mt-8">
          <div className="flex flex-col space-y-4 w-full lg:w-1/2">
            <TextInput
              name="title"
              placeholder="Judul laporan anda.."
              value={formData.title}
              onChange={handleChange}
              type={"text"}
              icon={"bx bx-copy-alt"}
              required={false}
            />
            <TextArea
              name="content"
              placeholder="Isi laporan anda.."
              value={formData.content}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              name="location"
              placeholder="Pilih lokasi kejadian"
              value={formData.location}
              onChange={handleChange}
              type={"text"}
              icon={"bx bxs-edit-location"}
              required={false}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Pilih Kategori Laporan
              </option>
              <option value="Pelayanan">Pelayanan Publik</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Kebersihan">Kebersihan</option>
            </select>
          </div>
          <label className="lg:w-1/2 flex flex-col items-center cursor-pointer">
            <div className="flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-md p-16 mt-4 text-gray-300">
              <i className="bx bx-image-add text-6xl "></i>
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
            SUBMIT
          </Button>
          <Alert
            isOpen={isModalOpen}
            onClose={closeModal}
            message="Data telah disimpan ke local storage."
          />
        </div>
      </form>
    </>
  );
};

export default FormReport;
