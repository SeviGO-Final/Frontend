import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComplaintsItem {
  _id: string;
  current_status: string;
  date: string;
  title: string;
  category: string;
  content: string;
}

interface ComplaintsState {
  data: ComplaintsItem[];
  filteredData: ComplaintsItem[];
}

// State awal
const initialState: ComplaintsState = {
  data: [],
  filteredData: [],
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    // Mengatur semua data keluhan
    setComplaintsData(state, action: PayloadAction<ComplaintsItem[]>) {
      state.data = action.payload;
      state.filteredData = action.payload;
    },

    // Mencari keluhan berdasarkan judul atau kategori
    searchComplaints(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredData = state.data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    },

    // Mengatur ulang filteredData ke semua data
    resetFilteredData(state) {
      state.filteredData = state.data;
    },
  },
});

export const { setComplaintsData, searchComplaints, resetFilteredData } =
  complaintsSlice.actions;
export default complaintsSlice.reducer;
