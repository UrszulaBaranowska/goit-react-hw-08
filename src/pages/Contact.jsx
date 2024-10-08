import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://connections-api.goit.global/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.post(API_URL, newContact, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Kontakt dodany!");
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { getState }) => {
    const { token } = getState().auth;
    await axios.delete(`${API_URL}/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Kontakt usunięty!");
    return contactId;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedData }, { getState }) => {
    const { token } = getState().auth;
    const response = await axios.patch(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("Kontakt zaktualizowany!");
    return response.data;
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
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export default contactsSlice.reducer;
