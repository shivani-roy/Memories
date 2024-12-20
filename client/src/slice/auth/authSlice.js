import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  authData: JSON.parse(localStorage.getItem("profile")) || null,
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ formData, navigate }) => {
    try {
      const { data } = await api.signUp(formData);
      console.log(data);
      navigate("/");

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ formData, navigate }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (navigate) => {
  try {
    await api.logout();
    navigate("/");
  } catch (error) {
    console.log(error);
  }
});

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async ({ decodedData, token, navigate }) => {
    try {
      const { data } = await api.googleAuth({ ...decodedData, token });
      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // auth: (state, action) => {
    //   localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

    //   state.authData = action?.payload;
    // },

    // logout: (state, action) => {
    //   localStorage.clear();
    //   console.log(action?.payload);
    //   state = { ...state, authData: null };
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

        state.authData = action?.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

        // return { ...state, authData: action?.payload }; // a return statement will also work here, but accessing the element directly is better
        state.authData = action?.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        localStorage.clear();
        state.authData = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

        state.authData = action?.payload;
      });
  },
});

// export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
