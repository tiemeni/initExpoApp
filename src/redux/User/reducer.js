import * as types from "./types"

const initialState = {
    userInfos: null,
    loading: false,
    ImageLoading: false,
    error: null,
    errorMsg: null,
    localAuth: null,
    success: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REINITIALIZE:
            return {
                ...state,
                error: false,
                errorMsg: null,
                success: null,
                settingPWLoading: true
            }
        case types.REGISTER_USER_REQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true,
                error: false,
                errorMsg: null,
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
        case types.UPDATE_USER_INFORMATION_RESQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true,
                error: false,
                errorMsg: null,
                success: null
            }
        case types.UPDATE_USER_INFORMATION_SUCCESS:
            return {
                ...state,
                userInfos: action.payload,
                loading: false,
                success: true
            }
        case types.UPDATE_USER_INFORMATION_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                error: true,
                success: false
            }
        case types.SET_USER_PROFIL_RESQUEST:
            return {
                ...state,
                userInfos: action.payload,
                ImageLoading: true,
                error: false,
                errorMsg: null,
                success: null
            }
        case types.SET_USER_PROFIL_SUCCESS:
            return {
                ...state,
                userInfos: action.payload,
                ImageLoading: false,
                success: true
            }
        case types.SET_USER_PROFIL_SUCCESS_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                ImageLoading: false,
                error: true,
                success: false
            }

        case types.LOGIN_REQUEST:
            return {
                ...state,
                userInfos: action.payload,
                loading: true,
                error: false,
                errorMsg: null,
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
                errorMsg: '',
                localAuth: false,
            }
        case types.LOCAL_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                localAuth: true,
                userInfos: action.payload
            }
        case types.PROCESS_VERIF_CODE_REQUEST:
            return {
                ...state,
                codeVerifLoading: true
            }
        case types.PROCESS_VERIF_CODE_SUCCESS:
            console.log("-----------------", action.payload)
            return {
                ...state,
                codeVerif: action.payload,
                codeVerifLoading: false
            }
        case types.PROCESS_VERIF_CODE_FAILED:
            return {
                ...state,
                errorCodeVerif: action.payload,
                codeVerifLoading: false
            }
        case types.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                settingPWLoading: true
            }
        case types.RESET_PASSWORD_REQUEST_SUCCESS:
            console.log("-----------------", action.payload)
            return {
                ...state,
                settingPWLoading: false
            }
        case types.RESET_PASSWORD_REQUEST_FAILED:
            return {
                ...state,
                errorResettingPw: action.payload,
                settingPWLoading: false
            }
        default:
            return state;
    }
}

export default UserReducer;