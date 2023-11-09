import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBookReducer } from "../reducers/books/createBookReducer";
import { configureStore } from "@reduxjs/toolkit";
import { fetchBookReducer } from "../reducers/books/fetchBookReducer";
import { userLoginReducer, userRegisterReducer } from "../reducers/users/userAuthReducer";

const rootReducer = combineReducers({
  // reducers
  bookCreated: createBookReducer,
  booksList: fetchBookReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});

//Get user from local storage
const userAuthData = localStorage.getItem("userAuthData")
  ? JSON.parse(localStorage.getItem("userAuthData"))
  : null;

//Set initial state
const initialState = {
  userRegister: { userInfo: userAuthData },
  userLogin: { userInfo: userAuthData },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: [thunk], // If you need to use Redux Thunk middleware
  devTools: process.env.NODE_ENV !== "production",
});

export { store };
