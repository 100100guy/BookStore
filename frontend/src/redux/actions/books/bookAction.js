import axios from "axios";
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
} from "../actionTypes";

// create book action
const createBookAction = (book) => {
  return async (dispatch) => {
    // Make an asynchronous call to the database
    dispatch({ type: CREATE_BOOK_REQUEST });

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        "http://localhost:3000/api/books/create",
        book,
        config
      );
      dispatch({ type: CREATE_BOOK_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: CREATE_BOOK_FAIL, payload: err.message });
    }
  };
};

// fetch all books action
const fetchBooksAction = () => {
  return async (dispatch) => {
    // Make an asynchronous call to the database
    dispatch({ type: FETCH_BOOK_REQUEST });
    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await axios.get("http://localhost:3000/api/books", config);
      dispatch({ type: FETCH_BOOK_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_BOOK_FAIL, payload: err.message });
    }
  };
};

export { createBookAction , fetchBooksAction};
