import { ReactNode, useEffect, useState } from "react";
import SideBar from "../../components/elements/Sidebar/sidebar";
import { useParams } from "react-router-dom";

interface SelectedItem {
  id: ReactNode;
  title: string;
  content: string;
  date: string;
  location: string;
  category: string;
  evidence: string | File;
}

const ViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState<SelectedItem | null>(null);

  useEffect(() => {
    // Ambil data dari localStorage
    const historyData = localStorage.getItem("history");

    if (historyData) {
      const parsedHistory: SelectedItem[] = JSON.parse(historyData);
      // Cari item dengan id yang sesuai
      const foundReport = parsedHistory.find((item) => item.id === Number(id));
      setReport(foundReport || null);
    }
  }, [id]);

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="bg-slate-200 flex flex-col items-center w-full h-1/2 pb-8 px-4 ml-8 mt-4 rounded-md shadow-sm">
          <h1 className="bg-orange-400 text-white text-xl font-medium p-4 rounded-2xl m-4">
            Detail Laporan - {id}
          </h1>
          <div className="overflow-y-auto h-132 bg-slate-50 flex flex-col p-8 space-y-4 w-full rounded-md shadow-sm">
            {report ? (
              <>
                <p>Status:</p>
                {[
                  { label: "Judul Laporan", value: report.title },
                  { label: "Tanggal Kejadian", value: report.date },
                  { label: "Lokasi", value: report.location },
                  { label: "Kategori", value: report.category },
                  { label: "Deskripsi", value: report.content },
                ].map(({ label, value }) => (
                  <p key={label} className="flex justify-between">
                    {label}:{" "}
                    <span className="border border-gray-300 w-1/2 bg-white p-4 mr-4 text-right rounded-md">
                      {value}
                    </span>
                  </p>
                ))}
                {report.evidence && (
                  <>
                    <p>Bukti Laporan:</p>
                    <img
                      src={report.evidence}
                      alt="Bukti Laporan"
                      className="w-64 rounded-md shadow-sm"
                    />
                    <a
                      href={report.evidence}
                      download="bukti_laporan.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-400 text-white p-2 rounded-md w-1/4 text-center underline-offset-0 "
                    >
                      Unduh Bukti Laporan
                    </a>
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
