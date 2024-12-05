import { useState, useEffect } from "react";
import { useCategories } from "./categories";
import api from "../../services/api";
// import { ComplaintType } from "../../types/complaint-type";

interface ComplaintProps {
  id: string;
  _id: string;
  feedback_id: string;
  title: string;
  content: string;
  date: string;
  date_event: string;
  location: string;
  category: string;
  evidence: File | null;
  status: string;
  current_status?: string;
}
export const useComplaintsWithCategories = () => {
  const [historyData, setHistoryData] = useState<ComplaintProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { categories } = useCategories(); // Ambil data kategori dari hook

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const resp = await api.get("users/complaints");
        const complaints = resp.data.data.complaints.map(
          (complaint: ComplaintProps) => {
            const categoryName =
              categories.find((category) => category._id === complaint.category)
                ?.name || "Unknown Category";

            return {
              id: complaint._id,
              feedback_id: complaint.feedback_id,
              title: complaint.title,
              description: complaint.content,
              date: complaint.date_event,
              location: complaint.location,
              category: categoryName,
              attachment: complaint.evidence,
              status: complaint.current_status,
            };
          }
        );
        console.log("API response:", resp.data.data.complaints);

        setHistoryData(complaints);
      } catch (err) {
        console.error("Fetch complaints error: ", err);
        setError("Failed to load complaints");
      }
    };

    if (categories.length > 0) {
      loadHistoryData(); // Pastikan data kategori tersedia sebelum memuat complaint
    }
  }, [categories]);

  return { historyData, error };
};
