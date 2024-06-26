import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (cartItem, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart`, cartItem);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${itemId}`);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartId, itemId, updateCartItem }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/${cartId}/${itemId}`,
        { ...updateCartItem, cartId } // Добавляем cartId в тело запроса
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/clear`);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItemsByCartId = createAsyncThunk(
  "cart/fetchCartItemsByCartId",
  async (cartId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${cartId}`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data); // Ловим и передаем ошибку дальше
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addItemToCart.pending, (state) => {
      state.status = "loading";
    })
    .addCase(addItemToCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItems = [...state.cartItems, action.payload]; // Используем spread operator для добавления элемента
    })
    .addCase(addItemToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
    // Другие кейсы оставляются без изменений
    .addCase(getCartItems.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })
      .addCase(deleteItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartItemsByCartId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsByCartId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsByCartId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
