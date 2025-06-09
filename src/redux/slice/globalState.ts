import { createSlice } from "@reduxjs/toolkit";

export const globalState = createSlice({
  name: "globalState",
  initialState: {
    isSidebarCollapsed: false,
    isHovering: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;

      if (state.isSidebarCollapsed) {
        state.isHovering = true;
      } else {
        state.isHovering = false;
      }
    },
    toggleHovering: (state) => {
      state.isHovering = !state.isHovering;
    },
    collapseSidebar: (state) => {
      state.isSidebarCollapsed = true;
      //   state.isHovering = false;
    },
    expandSidebar: (state) => {
      state.isSidebarCollapsed = false;
      //   state.isHovering = true;
    },
  },
});

export const { toggleSidebar, collapseSidebar, expandSidebar, toggleHovering } =
  globalState.actions;

export default globalState.reducer;
