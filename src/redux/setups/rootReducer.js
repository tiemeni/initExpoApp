import { combineReducers } from "redux";
import common from "../commons/reducers";

const rootReducer = combineReducers({
    Common: common,
});

export default rootReducer;