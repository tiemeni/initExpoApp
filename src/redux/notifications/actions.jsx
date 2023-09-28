import * as types from "./types";

export const getUserNotifications = (payload) => ({
  type: types.GET_USER_NOTIFICATIONS_REQUEST,
  payload,
});

export const saveSocketNotifications = (payload) => ({
  type: types.SAVE_SOCKET_NOTIFICATION,
  payload,
});

export const markAsReaded = () => ({
  type: types.MARK_ALL_AS_READED,
});
