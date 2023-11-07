//create book reducer
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
} from "../../actions/actionTypes";

const initialState = {
    loading: false,
    book: null,
    error: null,
  };
  
  const createBookReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BOOK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_BOOK_SUCCESS:
        return {
          ...state,
          book: action.payload,
          loading: false,
        };
      case CREATE_BOOK_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
export { createBookReducer}
