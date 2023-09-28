import * as types from "./types";

const initialState = {
  isLoading: false,
  notifications: [],
  message: null,
  error: false,
  unreaded: 0,
};

const NotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
        unreaded: state.unreaded + 1,
      };
    case types.MARK_ALL_AS_READED:
      return {
        ...state,
        unreaded: 0,
      }
    default:
      return state;
  }
};

export default NotificationsReducer;
