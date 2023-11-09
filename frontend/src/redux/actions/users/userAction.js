import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actionTypes";

//register user action
const registerUserAction = (username, email, password) => {
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
            username,
            email,
            password,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      //save the user into local storage
      localStorage.setItem("userAuthData", JSON.stringify(res.data));
      //set the state of userRegister to userLogin
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });

    } catch (err) {
      dispatch({ type: USER_REGISTER_FAIL, payload: err.response && err.response.data.message});
    }
  };
};

//login user action
const loginUserAction = (username,email, password) => {
  return async (dispatch) => {
    // Make an asynchronous call to the database
    dispatch({ type: USER_LOGIN_REQUEST });

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        {
            username,
            email,
            password,
        },
        config
      );
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      //save the user into local storage
      localStorage.setItem("userAuthData", JSON.stringify(res.data));

    } catch (err) {
      dispatch({ type: USER_LOGIN_FAIL, payload: err.response && err.response.data.message});
    }
  };
};

// logout user action
const logoutUserAction = () => {
  return (dispatch) => {
    localStorage.removeItem("userAuthData");
    dispatch({ type: USER_LOGOUT_SUCCESS });
  };
};


// user profile get action
const getUserProfileAction = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST });
    try {
      //get the token from the store
      const {userInfo}  = getState().userLogin;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo.token,
        },
      };
      const res = await axios.get(`http://localhost:3000/api/users/profile`, config);
      dispatch({ type: USER_PROFILE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: USER_PROFILE_FAIL, payload: err.response && err.response.data.message});
    }
  };
}  


export { registerUserAction, loginUserAction, logoutUserAction, getUserProfileAction };