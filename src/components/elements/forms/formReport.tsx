import { useEffect, useState } from "react";
import TextInput from "../modal/input/TextInput";
import TextArea from "../modal/input/TextArea";
import Alert from "../modal/alert/alert";
import Button from "../modal/button/button";
import api from "../../../services/api";
import { CategoryResponse } from '../../../types/category-type';
import { ComplaintType } from "../../../types/complaint-type";
import { AxiosError } from "axios";

type Categories = CategoryResponse[];

const FormReport = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorBody, setErrorBody] = useState<string | null>(null);
  const [previewEvidence, setPreviewEvidence] = useState<string | null>(null);
  const [complaint, setComplaint] = useState<ComplaintType>({
    _id:'',
    title: "",
    content: "",
    date_event: "",
    location: "",
    category: { _id: '', name: '' },
    evidence: null,
    is_deleted: false
  });

  // Get all categories
  useEffect(() => {
    api.get('/categories')
    .then(res => {
      const categories = res.data.data
      categories.sort((a: CategoryResponse, b: CategoryResponse) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setCategories(res.data.data)
    })
    .catch(err => {
      console.error(err.response.errors)
    });
  }, []);

  // Clean up preview evidence image
  useEffect(() => {
    if (!previewEvidence) return;
    return () => {
      URL.revokeObjectURL(previewEvidence);
    };
  }, [previewEvidence]);

  // Function to handle input text change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle file evidence
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const evidence = e.target.files[0];
    setComplaint((prev) => ({
      ...prev, evidence: evidence
    }));

    // Preview image
    const imageUrl = evidence ? URL.createObjectURL(evidence) : "";
    setPreviewEvidence(imageUrl);
  };

  // Function to handle submit button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!complaint.category) {
      setErrorBody('Please, select the category');
      setIsModalOpen(true);
      return;
    }

    const requestBody = new FormData();
    requestBody.append("title", complaint.title);
    requestBody.append("content", complaint.content);
    requestBody.append("date_event", complaint.date_event);
    requestBody.append("location", complaint.location);
    requestBody.append("category", complaint.category.name);    
    if (complaint.evidence) {
      requestBody.append("evidence", complaint.evidence);
    }

    // Debugging the request body
    for (const [key, value] of requestBody.entries()) {      
      console.log(`${key}:`, value);
    }

    // Post complaint to the server
    try {
      const response = await api.post("/complaints", requestBody);
      setComplaint(response.data.data);
      console.log("Response from api: ", response.data.data);
      setIsModalOpen(true);

    } catch(err: unknown) {
      let errorMessage: string = "";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data.errors;        
        console.error(errorMessage);
        setErrorBody(errorMessage);
      } else {
        errorMessage = (err as Error).message || "Error submitting complaint";
        console.error(errorMessage);
        setErrorBody(errorMessage);
      }      
      setIsModalOpen(true);
    }
  };
  
  // Function to handle cancel button  
  const handleCancel = () => {
    setComplaint({
      _id:'',
      title: "",
      content: "",
      date_event: "",
      location: "",
      category: { _id: '', name: '' },
      evidence: null,
      is_deleted: false
    });
  };  

  // Modal toggle
  const closeModal = () => {
    setErrorBody(null);
    setIsModalOpen(false)
  };

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
              value={complaint.title}
              onChange={handleInputChange}
              type={"text"}
              icon={"bx bx-copy-alt"}
              required={false}
            />
            <TextArea
              name="content"
              placeholder="Isi laporan anda.."
              value={complaint.content}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date_event"
              value={complaint.date_event}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <TextInput
              name="location"
              placeholder="Masukkan lokasi kejadian"
              value={complaint.location}
              onChange={handleInputChange}
              type={"text"}
              icon={"bx bxs-edit-location"}
              required={false}
            />
            <select
              name="category"
              value={complaint.category.name}
              onChange={handleInputChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled value="">
                Pilih Kategori Laporan
              </option>
              {
                categories.map((category: CategoryResponse) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              }                            
            </select>
          </div>
          <label className="lg:w-1/2 flex flex-col items-center cursor-pointer">
            <span className="text-gray-600 mb-2 mt-2">Upload Bukti</span>
            <div className={`flex flex-col items-center justify-center space-x-2 border border-gray-300 rounded-md ${previewEvidence ? 'p-1' : 'p-16'} text-gray-300`}>
              { previewEvidence ? (
                  <>
                    <img
                      src={previewEvidence}
                      alt="Preview Evidence"
                      className="object-cover rounded-sm w-96 h-auto" />
                    <span className="text-slate-600 text-sm mt-2">{complaint.evidence?.name}</span>
                  </>                  
                ) : (
                  <>
                    <i className="bx bx-image-add text-6xl"></i>
                    <span className="flex flex-col text-xs text-center">
                      Please upload a JPG, PNG, or JPEG image.{" "}
                      <span>Keep the file size under 2MB.</span>
                    </span>
                  </>                            
                )}          
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
            message={
              errorBody
              ? errorBody
              : "Keluhan anda telah dikirim ke Admin."
            }
          />
        </div>
      </form>
    </>
  );
};

export default FormReport;