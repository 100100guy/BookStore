//get book reducer
import {
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
  loading: false,
  books: [],
  error: null,
};

const fetchBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case FETCH_BOOK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { fetchBookReducer };
