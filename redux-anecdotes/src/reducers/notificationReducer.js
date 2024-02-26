import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    removeNotification() {
      const notification = "";
      return notification;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, aika) => {
  let aikaMillisekunteina = 0;
  if (aika < 1 || aika === undefined || aika > 10) {
    aikaMillisekunteina = 5000;
  } else {
    aikaMillisekunteina = aika * 1000;
  }
  return async (dispatch) => {
    dispatch(addNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
      //errori = false;
    }, aikaMillisekunteina);
  };
};

export default notificationSlice.reducer;
