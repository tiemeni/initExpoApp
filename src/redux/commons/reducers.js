import { LAUNCH_APP, MY_FICHES, SETIDCENTRE, SET_PROFESSION, SHOULD_SEE_BEHIND } from "./types";

let initialState = {
    shouldSeeBehind: false,
    mesFiches: []
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
        case MY_FICHES:
            let actualFiches = state.mesFiches
            return {
                ...state,
                mesFiches: [...actualFiches, action.payload]
            }
        case SETIDCENTRE:
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