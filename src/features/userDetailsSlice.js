import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://65f17f66034bdbecc762d5bf.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      console.log("Create User API Response:", result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  Read
export const showData = createAsyncThunk(
  "showData",
  async (rejectWithValue) => {
    const response = await fetch(
      "https://65f17f66034bdbecc762d5bf.mockapi.io/crud"
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  delete Single User
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, rejectWithValue) => {
    const response = await fetch(
      `https://65f17f66034bdbecc762d5bf.mockapi.io/crud/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update User
export const EditUser = createAsyncThunk(
  "EditUser",
  async (data, rejectWithValue) => {
    console.log("updated data" , data);
    const response = await fetch(
      `https://65f17f66034bdbecc762d5bf.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData:[],
  },
  reducers:{
    searchUser: (state, action)=>{
      state.searchData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(showData.pending, (state) => {
        state.loading = true;
      })
      .addCase(showData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(EditUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(EditUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele)=>(
          ele.id === action.payload.id ? action.payload : ele
        ))
      })
      .addCase(EditUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userDetails.reducer;
export const {searchUser} = userDetails.actions;
