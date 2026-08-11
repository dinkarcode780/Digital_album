import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

// ======================= User Register =======================

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/userRegister",
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= User Login =======================

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/userLogin",
        loginData
      );

      localStorage.setItem("userToken", response.data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Update Profile =======================

export const userUpdateProfile = createAsyncThunk(
  "user/userUpdateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("userId", profileData.userId);
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phoneNumber", profileData.phoneNumber);
      formData.append("address", profileData.address);

      if (profileData.profileImage) {
        formData.append(
          "profileImage",
          profileData.profileImage
        );
      }

      const response = await axiosInstance.put(
        "/users/userUpdateProfile",
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

export const userChangePassword = createAsyncThunk(
  "user/userChangePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/users/userChangePassword",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Get User By Id =======================

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/users/getUserById?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Get User By Filter =======================

export const getUserByFilter = createAsyncThunk(
  "user/getUserByFilter",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/users/getUserByFilter",
        {
          params,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Delete User =======================

export const userDeleteById = createAsyncThunk(
  "user/userDeleteById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/users/userDeleteById?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Toggle User Status =======================

export const toggleUserStatus = createAsyncThunk(
  "user/toggleUserStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/users/toggleUserStatus?userId=${userId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Forget Password =======================

// export const userForgetPassword = createAsyncThunk(
//   "user/userForgetPassword",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         "/users/userForgetPassword",
//         { email }
//       );

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || {
//           success: false,
//           message: "Something went wrong",
//         }
//       );
//     }
//   }
// );
export const userForgetPassword = createAsyncThunk(
  "user/userForgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/userForgetPassword",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);


export const userResetPassword = createAsyncThunk(
  "user/userResetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/userResetPassword",
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    }
  }
);

// ======================= Logout =======================

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/users/userLogout"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Something went wrong",
        }
      );
    } finally {
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    }
  }
);