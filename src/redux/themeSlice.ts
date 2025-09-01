// src/redux/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';

interface ThemeState {
  mode: ThemeType;
  userSelected: boolean; 
}

const initialState: ThemeState = {
  mode: 'light',
  userSelected: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.mode = action.payload;
      state.userSelected = true;
    },
    setThemeFromSystem: (state, action: PayloadAction<ThemeType>) => {
      if (!state.userSelected) {
        state.mode = action.payload;
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      state.userSelected = true;
    },
    resetUserSelected: (state) => {
      state.userSelected = false;
    }
  },
});

export const { setTheme, setThemeFromSystem, toggleTheme, resetUserSelected } = themeSlice.actions;
export default themeSlice.reducer;
