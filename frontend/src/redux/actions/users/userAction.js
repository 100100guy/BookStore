import axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actionTypes";

//register user action
const registerUserAction = (name, email, password) => {
  return async (dispatch) => {
    // Make an asynchronous call to the database
    dispatch({ type: USER_REGISTER_REQUEST });

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        {
            name,
            email,
            password,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      //save the user into local storage
        localStorage.setItem("userAuthData", JSON.stringify(res.data));

    } catch (err) {
      dispatch({ type: USER_REGISTER_FAIL, payload: err.response && err.response.data.message});
    }
  };
};

export { registerUserAction };