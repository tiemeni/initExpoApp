import { combineReducers } from "redux";
import common from "../commons/reducers";
import UserReducer from "../User/reducer"

const rootReducer = combineReducers({
    Common: common,
    UserReducer: UserReducer
});

export default rootReducer;