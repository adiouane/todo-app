import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortConfig, SortDirection, SortOption } from '@/types/todo';

interface UIState {
  searchQuery: string;
  sortConfig: SortConfig;
}

const initialState: UIState = {
  searchQuery: '',
  sortConfig: {
    option: 'createdAt',
    direction: 'desc',
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Update search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Set sort option
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortConfig.option = action.payload;
    },

    // Set sort direction
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortConfig.direction = action.payload;
    },

    // Toggle sort direction
    toggleSortDirection: (state) => {
      state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    },

    // Set complete sort configuration
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
  },
});

export const { 
  setSearchQuery, 
  setSortOption, 
  setSortDirection, 
  toggleSortDirection, 
  setSortConfig 
} = uiSlice.actions;

export default uiSlice.reducer;
