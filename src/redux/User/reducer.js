import * as types from "./types"

const initialState = {
    userInfos: null,
    loading: false,
    error: null,
    errorMsg: "",
    localAuth: null,
    success: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REINITIALIZE:
            return {
                ...state,
                error: false,
                success: null
            }
        case types.REGISTER_USER_REQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true,
                error: false,
                errorMsg: "",
                success: null
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
                errorMsg: action.payload,
                loading: false,
                error: true,
                success: false
            }
        case types.LOGIN_REQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true,
                error: false,
                errorMsg: '',
                success: null
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                userInfos: action.payload,
                loading: false,
                error: false,
                success: true
            }
        case types.LOGIN_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                error: true,
                success: false
            }
        case types.LOCAL_AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.LOCAL_AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload || '',
                localAuth: false
            }
        case types.LOCAL_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                localAuth: true,
                userInfos: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;