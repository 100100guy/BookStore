import {  combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBookReducer } from "../reducers/books/createBookReducer";
import { configureStore } from "@reduxjs/toolkit";
import { fetchBookReducer } from "../reducers/books/fetchBookReducer";

const rootReducer = combineReducers({
  // reducers
  bookCreated: createBookReducer,
  booksList: fetchBookReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk], // If you need to use Redux Thunk middleware
    devTools: process.env.NODE_ENV !== "production",
  });

export { store };
