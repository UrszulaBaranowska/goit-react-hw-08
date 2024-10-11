import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://connections-api.goit.global/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) {
      toast.error("Authorization token missing. Log in again.");
      return rejectWithValue("No authorization token.");
    }
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("The contacts have been downloaded!");
      return response.data;
    } catch (error) {
      toast.error("Error while downloading contacts.");
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.post(API_URL, newContact, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Contact added!");
      return response.data;
    } catch (error) {
      toast.error("Error when adding a contact.");
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      await axios.delete(`${API_URL}/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Contact removed!");
      return contactId;
    } catch (error) {
      toast.error("Error while deleting a contact.");
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Contact updated!");
      return response.data;
    } catch (error) {
      toast.error("Error while editing a contact.");
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export default contactsSlice.reducer;
