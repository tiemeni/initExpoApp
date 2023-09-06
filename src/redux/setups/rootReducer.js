import { combineReducers } from "redux";
import common from "../commons/reducers";
import ProfessionReducer from "../professions/reducers";
import RDVReducer from "../RDV/reducers";
import UserReducer from "../User/reducer"
import PraticienReducer from "../Praticiens/reducers";

const rootReducer = combineReducers({
    Common: common,
    UserReducer: UserReducer,
    Profession: ProfessionReducer,
    RdvForm: RDVReducer,
    Praticiens: PraticienReducer
});

export default rootReducer;