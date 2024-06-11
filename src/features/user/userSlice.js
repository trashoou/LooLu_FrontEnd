import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // Импортируем createAsyncThunk и createSlice из @reduxjs/toolkit
import axios from "axios"; // Импортируем axios для выполнения HTTP-запросов
import { BASE_URL } from '../../utils/constants'; // Импортируем BASE_URL из файла констант

// Определяем асинхронное действие для создания пользователя
export const createUser = createAsyncThunk(
    'users/createUser', // Уникальный идентификатор для этого асинхронного действия
    async (payload, thunkApi) => { // Асинхронная функция, которая принимает payload и thunkApi
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload); // Отправляем POST-запрос для создания пользователя
            return res.data; // Возвращаем данные ответа
        } catch(err) {
            console.log(err); // Логируем ошибку в консоль
            return thunkApi.rejectWithValue(err); // Возвращаем ошибку через thunkApi
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/createUser', 
    async (payload, thunkApi) => { 
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload); 
            return res.data; 
        } catch(err) {
            console.log(err); 
            return thunkApi.rejectWithValue(err); 
        }
    }
);

// Создаем слайс состояния для пользователя
const userSlice = createSlice({
    name: 'user', // Имя слайса состояния
    initialState: { // Начальное состояние
        currentUser: null, // Текущий пользователь (изначально null)
        cart: [], // Корзина (изначально пустой массив)
        isLoading: false, // Индикатор загрузки (изначально false)
        formType: "signup", // Тип формы (по умолчанию "signup")
        showForm: false, // Показ формы (изначально false)
    },
    reducers: { // Обычные синхронные редьюсеры
        addItemToCart: (state, { payload } ) => { // Редьюсер для добавления товара в корзину
            let newCart = [...state.cart]; // Создаем копию текущей корзины
            const found = state.cart.find(({id}) => id === payload.id) // Ищем товар в корзине по id

            if(found) { // Если товар найден в корзине
                newCart = newCart.map((item) => { // Обновляем количество товара
                    return item.id === payload.id 
                    ? { ...item, quantity: payload.quantity || item.quantity + 1} // Увеличиваем количество товара
                    : item; // Оставляем остальные товары без изменений
                });
            } else newCart.push({ ...payload, quantity: 1}) // Если товар не найден, добавляем его в корзину с quantity 1

            state.cart = newCart; // Обновляем состояние корзины
        },
        toggleForm: (state, { payload }) => { // Редьюсер для переключения показа формы
            state.showForm = payload; // Обновляем состояние showForm
        }
    },
    extraReducers: (builder) => { // Асинхронные редьюсеры
        // builder.addCase(getCategories.pending, (state) => {
        //     state.isLoading = true;
        // });
        builder.addCase(createUser.fulfilled, (state, { payload }) => { // Редьюсер для успешного создания пользователя
            state.currentUser = payload; // Обновляем состояние текущего пользователя
        });
        // builder.addCase(getCategories.rejected, (state) => {
        //     state.isLoading = false;
        // });
    },
});

// Экспортируем действия для использования в компонентах
export const { addItemToCart, toggleForm } = userSlice.actions;

// Экспортируем редьюсер по умолчанию
export default userSlice.reducer;
