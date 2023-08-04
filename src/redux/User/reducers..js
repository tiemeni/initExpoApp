import * as types from "./types"

const initialState = {
    userInfos: null,
    loading: false,
    error: null
  };

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                userInfos: action.payload,
            }
        default:
            return state;
    }
}

export default UserReducer;