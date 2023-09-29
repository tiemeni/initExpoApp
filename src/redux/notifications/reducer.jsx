import * as types from "./types";

const initialState = {
  isLoading: false,
  notifications: [],
  message: null,
  error: false,
  unreaded: 0,
  renderKey: 0,
};

const NotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
        unreaded: 0,
      };
    case types.GET_USER_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
        error: false,
      };
    case types.GET_USER_NOTIFICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload.message,
      };
    case types.SAVE_SOCKET_NOTIFICATION:
      let actualStateUnread = state.unreaded;
      let newStateUnread = actualStateUnread + 1;
      let actualStateNotifications = state.notifications;
      let newStateNotifications = [...actualStateNotifications, action.payload];
      console.log(newStateUnread);
      return {
        ...state,
        notifications: newStateNotifications,
        unreaded: newStateUnread,
      };
    case types.MARK_ALL_AS_READED:
      return {
        ...state,
        unreaded: 0,
      };
    default:
      return state;
  }
};

export default NotificationsReducer;
