import {  combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBookReducer } from "../reducers/books/createBookReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // reducers
  bookCreated: createBookReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk], // If you need to use Redux Thunk middleware
    devTools: process.env.NODE_ENV !== "production",
  });

export { store };
