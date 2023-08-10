import * as types from "./types";

export const storeUserInfo = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
})

export const userRegistration = payload => ({
  type: types.REGISTER_USER_REQUEST,
  payload
})
