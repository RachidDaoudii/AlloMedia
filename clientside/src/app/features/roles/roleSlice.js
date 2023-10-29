import { createSlice } from "@reduxjs/toolkit";
const roleState = [
  {
    _id: null,
    name: null,
  },
];

const roleSlice = createSlice({
  name: "role",
  initialState: roleState,
  reducers: {
    setRole: (state, action) => {
      action.payload.data.map((v, i) => {
        state[i] = v;
      });
    },
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
