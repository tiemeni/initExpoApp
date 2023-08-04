import * as types from "./types";

export const storeUserInfo = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
})
