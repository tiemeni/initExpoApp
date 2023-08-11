import { LAUNCH_APP, SETIDCENTRE, SET_PROFESSION, SHOULD_SEE_BEHIND } from "./types";

let initialState = {
    shouldSeeBehind: false
};

const common = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCH_APP:
            return {
                ...state,
                actualStep: action.step
            };
        case SET_PROFESSION:
            return {
                ...state,
                isProfession: action.p
            };
        case SETIDCENTRE:
            console.log(action.payload)
            return {
                ...state,
                idc: action.payload
            }
        case SHOULD_SEE_BEHIND:
            return {
                ...state,
                shouldSeeBehind: action.s
            };
        default:
            return state;
    };
};

export default common;