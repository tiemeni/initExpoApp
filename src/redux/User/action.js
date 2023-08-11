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