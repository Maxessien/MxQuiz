import { UserSlice } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const defaultUserState: UserSlice = {
  avatarUrl: "",
  email: "",
  name: "",
  role: "user",
  userId: "",
  idToken: "",
  isLoggedIn: false,
};

const initialState: UserSlice = defaultUserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (_, { payload }: PayloadAction<UserSlice>) => {
      return payload;
    },
    setUserField: (
      state,
      {
        payload: { field, val },
      }: PayloadAction<{
        field: "name" | "email" | "userId" | "avatarUrl" | "idToken";
        val: string;
      }>,
    ) => {
      state[field] = val;
    },
    setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
  },
});

export const { setLoggedIn, setUserField, setUserState } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
