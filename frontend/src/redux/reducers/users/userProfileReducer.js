// reducer for user profile
import { USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../../actions/actionTypes";

const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
        return { loading: true };
        case USER_PROFILE_SUCCESS:
        return { loading: false, userProfile: action.payload };
        case USER_PROFILE_FAIL:
        return { loading: false, error: action.payload };
        default:
        return state;
    }
    }

export { userProfileReducer };