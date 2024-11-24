import { ReactNode, useEffect, useState } from "react";
import SideBar from "../../components/elements/Sidebar/sidebar";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import ImagePreviewFromAPI from "../../components/ImagePreview";

interface Complaint {
  id: ReactNode;
  title: string;
  content: string;
  date: string;
  location: string;
  category: string;
  evidence: string | File;
  status: string;
}

const ViewReport = () => {
  const { id } = useParams<{ id: string }>(); // Mengambil ID dari URL
  const [complaint, setComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    const fetchComplaintDetail = async () => {
      try {
        const resp = await api.get(`users/complaints/`);
        const complaints = resp.data.data.complaints;
        const foundComplaint = complaints.find((comp: any) => comp._id === id);

        if (foundComplaint) {
          setComplaint({
            id: foundComplaint._id,
            title: foundComplaint.title,
            content: foundComplaint.content,
            date: foundComplaint.date_event,
            location: foundComplaint.location,
            category: foundComplaint.category, // Perlu konversi ke nama kategori
            evidence: foundComplaint.evidence,
            status: foundComplaint.current_status,
          });
        } else {
          console.log("Complaint not found");
        }
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    };

    if (id) {
      fetchComplaintDetail();
    }
  }, [id]);

  if (!complaint) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex ">
        <SideBar />
        <div className="bg-slate-200 flex flex-col items-center w-full h-1/2 pb-8 px-4 lg:ml-8 mt-4 rounded-md shadow-sm">
          <h1 className="bg-orange-400 text-white text-xl font-medium p-4 rounded-2xl m-4">
            Detail Laporan - {id}
          </h1>
          <div className="overflow-y-auto h-132 bg-slate-50 flex flex-col p-8 space-y-4 w-full rounded-md shadow-sm">
            {complaint ? (
              <>
                <p className="flex justify-between items-center mr-8 text-xl lg:text-lg">
                  Status:
                  <span
                    className={
                      complaint.status
                        ? "bg-green-500 p-2 rounded-xl text-white"
                        : "bg-red-500 p-2 rounded-xl text-white"
                    }
                  >
                    {complaint.status ? "Submitted" : "Rejected"}
                  </span>
                </p>
                {[
                  { label: "Judul Laporan", value: complaint.title },
                  {
                    label: "Tanggal Kejadian",
                    value: complaint.date?.split(",")[0],
                  },
                  { label: "Lokasi", value: complaint.location },
                  { label: "Kategori", value: complaint.category }, // Nama kategori
                  { label: "Deskripsi", value: complaint.content },
                ].map(({ label, value }) => (
                  <p
                    key={label}
                    className="flex flex-col lg:flex-row lg:justify-between"
                  >
                    {label}:{" "}
                    <span className="border border-gray-300 w-full lg:w-1/2 bg-white p-4 mr-4 text-left rounded-md">
                      {value}
                    </span>
                  </p>
                ))}
                {complaint.evidence && (
                  <>
                    <p>Bukti Laporan:</p>
                    {complaint?.evidence ? (
                      <ImagePreviewFromAPI
                        alt="Complaint"
                        image={complaint.evidence}
                      />
                    ) : (
                      "No Image Available"
                    )}
                  </>
                )}
              </>
            ) : (
              <p>Report not found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReport;
