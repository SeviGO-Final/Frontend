import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComplaintsItem {
  id: string;
  date: string;
  title: string;
  category: string;
  content: string;
}

interface ComplaintsState {
  data: ComplaintsItem[];
  filteredData: ComplaintsItem[];
}

const initialState: ComplaintsState = {
  data: [],
  filteredData: [],
};

const complaintsSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    setComplaintsData(state, action: PayloadAction<ComplaintsItem[]>) {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    searchComplaints(state, action: PayloadAction<string>) {
      const query = action.payload.toLowerCase();
      state.filteredData = state.data.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    },
  },
});

export const { setComplaintsData, searchComplaints } = complaintsSlice.actions;
export default complaintsSlice.reducer;
