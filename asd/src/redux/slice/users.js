import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch("http://localhost:3000/users");
  return response.json();
});

export const addUser = createAsyncThunk("addUser", async (userData) => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
});

export const deleteUser = createAsyncThunk("deleteUser", async (userId) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  });
  return userId;
});

export const editUser = createAsyncThunk(
  "editUser",
  async ({ id, ...userData }) => {
    console.log(userData);
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response.json();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log("Error :", action.payload);
      state.isError = true;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      // Update state immutably
      return {
        ...state,
        isLoading: false,
        data: Array.isArray(action.payload)
          ? action.payload
          : [...state.data, action.payload],
      };
    });
    builder.addCase(addUser.rejected, (state, action) => {
      console.log("Error :", action.payload);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload.id;

      return {
        ...state,
        isLoading: false,
        data: state.data
          ? state.data.filter((user) => user.id !== deletedUserId)
          : state.data,
      };
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      console.log("Error :", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(editUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      return {
        isLoading: false,
        data: state.data.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...user,
              username: action.payload.username,
            };
          }
          return user;
        }),
      };
    });
    builder.addCase(editUser.rejected, (state, action) => {
      console.log("Error :", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
