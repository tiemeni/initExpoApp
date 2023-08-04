import { combineReducers } from "redux";
import common from "../commons/reducers";
import UserReducer from "../User/reducers.";

const rootReducer = combineReducers({
    Common: common,
    User: UserReducer
});

export default rootReducer;