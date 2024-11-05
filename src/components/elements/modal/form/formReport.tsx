import { useState } from "react";
import TextInput from "../input/TextInput";
import TextArea from "../input/TextArea";
import Alert from "../alert/alert";
import Button from "../button/button";
interface NewReport {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attachment: File | null;
}
const FormReport = () => {
  const [formData, setFormData] = useState<NewReport>({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    attachment: null,
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
      description: "",
      date: "",
      location: "",
      category: "",
      attachment: null,
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
    // Simpan data ke local storage
    localStorage.setItem("reportData", JSON.stringify(formData));
    setIsModalOpen(true);
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "",
      attachment: null,
    });
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 mx-8 h-3/4 w-full bg-gray-100 rounded-lg"
      >
        <div className="flex space-x-4 mt-8">
          <div className="flex flex-col space-y-4 w-1/2">
            <TextInput
              name="title"
              placeholder="Judul laporan anda.."
              value={formData.title}
              onChange={handleChange}
            />
            <TextArea
              name="description"
              placeholder="Isi laporan anda.."
              value={formData.description}
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
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Pilih kategori laporan
              </option>
              <option value="pelayanan">Pelayanan Publik</option>
              <option value="transportasi">Transportasi</option>
              <option value="kebersihan">Kebersihan</option>
            </select>
          </div>
          <label className="w-1/2 flex flex-col items-center cursor-pointer">
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
