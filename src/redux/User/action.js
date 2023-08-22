import * as types from "./types";

export const storeUserInfo = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
})

export const userRegistration = payload => ({
  type: types.REGISTER_USER_REQUEST,
  payload
})

export const userLogin = payload => ({
  type: types.LOGIN_REQUEST,
  payload
})

export const userLocalAuth = () => ({
  type: types.LOCAL_AUTH_REQUEST,
})

export const userLogout = () => ({
  type: types.LOGOUT_REQUEST
})

export const reinitialize = () => ({ type: types.REINITIALIZE })

export const userInfoUpdate = (payload, _id) => ({
  type: types.UPDATE_USER_INFORMATION_RESQUEST,
  payload, _id
})

export const sendExpoToken = payload => ({
  type: types.SEND_EXPO_TOKEN_REQUEST,
  payload
})

export const userSetProfile = (payload, _id) => ({
  type: types.SET_USER_PROFIL_RESQUEST,
  payload, _id
})