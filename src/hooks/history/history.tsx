import { useState, useEffect } from "react";
import { useCategories } from "./categories";
import api from "../../services/api";

interface HistoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attachment: string | null;
  status: string;
}

export const useComplaintsWithCategories = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { categories } = useCategories(); // Ambil data kategori dari hook

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const resp = await api.get("users/complaints");
        const complaints = resp.data.data.complaints.map((complaint: any) => {
          const categoryName =
            categories.find((category) => category._id === complaint.category)
              ?.name || "Unknown Category";

          return {
            id: complaint._id,
            title: complaint.title,
            description: complaint.content,
            date: complaint.date_event,
            location: complaint.location,
            category: categoryName,
            attachment: complaint.evidence,
            status: complaint.current_status,
          };
        });
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
