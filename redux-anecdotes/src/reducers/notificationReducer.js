import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      const notification = action.payload;
      /*   
      state.push({
        notification,
      });
      */
      return notification;
    },
    removeNotification(state, action) {
      const notification = "";
      return notification;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
