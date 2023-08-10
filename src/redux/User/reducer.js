import * as types from "./types"

const initialState = {
    userInfos: null,
    loading: false,
    success: null,
    error: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER_REQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true
            }
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                userInfos: action.payload,
                loading: false,
                success: true
            }
        case types.REGISTER_USER_FAILED:
            return {
                ...state,
                userInfos: action.payload,
                loading: false,
                success: false
            }
        default:
            return state;
    }
}

export default UserReducer;