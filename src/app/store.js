import {configureStore} from "@reduxjs/toolkit";
import todoReducer from '../../src/slices/todoSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})