// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/constants';
// import { shuffle } from '../../utils/common';

// // Thunks pentru produse
// export const getProducts = createAsyncThunk(
//     'products/getProducts',
//     async (_, thunkApi) => {
//         try {
//             const res = await axios(`${BASE_URL}/products`);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkApi.rejectWithValue(err);
//         }
//     }
// );

// export const fetchMoreProducts = createAsyncThunk(
//     'products/fetchMoreProducts',
//     async ({ page, pageSize }, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${BASE_URL}/products?page=${page}&size=${pageSize}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// export const postProduct = createAsyncThunk(
//     'products/postProduct',
//     async (productData, { rejectWithValue }) => {
//       try {
//         const response = await axios.post(`${BASE_URL}/products`, productData);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response.data);
//       }
//     }
// );

// export const deleteProduct = createAsyncThunk(
//     'products/deleteProduct',
//     async (id, thunkApi) => {
//         try {
//             const res = await axios.delete(`${BASE_URL}/products/${id}`);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkApi.rejectWithValue(err);
//         }
//     }
// );

// export const updateProduct = createAsyncThunk(
//     'products/updateProduct',
//     async (payload, thunkApi) => {
//         try {
//             const res = await axios.put(`${BASE_URL}/products/${payload.id}`, payload);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkApi.rejectWithValue(err);
//         }
//     }
// );

// export const getProductById = createAsyncThunk(
//     'products/getProductById',
//     async (id, thunkApi) => {
//         try {
//             const res = await axios(`${BASE_URL}/products/${id}`);
//             return res.data;
//         } catch(err) {
//             console.log(err);
//             return thunkApi.rejectWithValue(err);
//         }
//     }
// );

// // Нарезка для продуктов
// const productsSlice = createSlice({
//     name: 'products',
//     initialState: {
//         list: [],
//         productDetails: null,
//         filtered: [],
//         related: [],
//         isLoading: false,
//         error: null,
//         hasMore: true, // Добавить: Статус, указывающий, есть ли еще товары
//     },
//     reducers: {
//         clearProducts(state) {
//             state.list = [];
//             state.hasMore = true;
//         },
//         setProducts(state, action) {
//             state.list = action.payload;
//         },
//         filterByPrice: (state, { payload }) => {
//             state.filtered = state.list.filter(({ price }) => price < payload);
//         },
//         getRelatedProducts: (state, { payload }) => {
//             const list = state.list.filter(({ categoryId }) => categoryId === payload);
//             state.related = shuffle(list);
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getProducts.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(getProducts.fulfilled, (state, { payload }) => {
//             state.list = payload;
//             state.isLoading = false;
//         });
//         builder.addCase(getProducts.rejected, (state) => {
//             state.isLoading = false;
//         });
//         builder.addCase(postProduct.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(postProduct.fulfilled, (state, { payload }) => {
//             state.list.push(payload); // добавляем новый продукт в список
//             state.isLoading = false;
//         });
//         builder.addCase(postProduct.rejected, (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         });
//         builder.addCase(deleteProduct.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
//             state.list = state.list.filter(product => product.id !== payload.id);
//             state.isLoading = false;
//         });
//         builder.addCase(deleteProduct.rejected, (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         });
//         builder.addCase(updateProduct.pending, (state) => {
//             state.isLoading = true;
//             state.error = null;
//         });
//         builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
//             const index = state.list.findIndex(product => product.id === payload.id);
//             if (index !== -1) {
//                 state.list[index] = payload;
//             }
//             state.isLoading = false;
//         });
//         builder.addCase(updateProduct.rejected, (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         });
//         builder.addCase(getProductById.pending, (state) => {
//             state.isLoading = true;
//             state.productDetails = null;
//             state.error = null;
//         });
//         builder.addCase(getProductById.fulfilled, (state, { payload }) => {
//             state.productDetails = payload;
//             state.isLoading = false;
//         });
//         builder.addCase(getProductById.rejected, (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         });

//         // Скидки для fetchMoreProducts
//         builder.addCase(fetchMoreProducts.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(fetchMoreProducts.fulfilled, (state, { payload }) => {
//             state.list = [...state.list, ...payload]; // Изменено на работу с массивом продуктов
//             state.hasMore = payload.length > 0; // Если длина массива меньше запрошенного размера страницы, это последняя страница
//             state.isLoading = false;
//         });
//         builder.addCase(fetchMoreProducts.rejected, (state, { payload }) => {
//             state.isLoading = false;
//             state.error = payload;
//         });
//     },
// });

// export const { clearProducts, setProducts, filterByPrice, getRelatedProducts } = productsSlice.actions;

// export default productsSlice.reducer;
//----------------------------------------------------------
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';

// Thunks pentru produse
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkApi) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  'products/fetchMoreProducts',
  async ({ categoryId, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products?categoryId=${categoryId}&page=${page}&size=${pageSize}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postProduct = createAsyncThunk(
  'products/postProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, thunkApi) => {
    try {
      const res = await axios.delete(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (payload, thunkApi) => {
    try {
      const res = await axios.put(`${BASE_URL}/products/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id, thunkApi) => {
    try {
      const res = await axios(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    productDetails: null,
    filtered: [],
    related: [],
    isLoading: false,
    error: null,
    hasMore: true, // Добавить: Статус, указывающий, есть ли еще товары
  },
  reducers: {
    clearProducts(state) {
      state.list = [];
      state.hasMore = true;
    },
    setProducts(state, action) {
      state.list = action.payload;
    },
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ categoryId }) => categoryId === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(postProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postProduct.fulfilled, (state, { payload }) => {
      state.list.push(payload); // добавляем новый продукт в список
      state.isLoading = false;
    });
    builder.addCase(postProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.list = state.list.filter(product => product.id !== payload.id);
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const index = state.list.findIndex(product => product.id === payload.id);
      if (index !== -1) {
        state.list[index] = payload;
      }
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
      state.productDetails = null;
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.productDetails = payload;
      state.isLoading = false;
    });
    builder.addCase(getProductById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // Скидки для fetchMoreProducts
    builder.addCase(fetchMoreProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMoreProducts.fulfilled, (state, { payload }) => {
      state.list = [...state.list, ...payload];
      state.hasMore = payload.length > 0;
      state.isLoading = false;
    });
    builder.addCase(fetchMoreProducts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});

export const { clearProducts, setProducts, filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;

