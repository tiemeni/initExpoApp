import { LAUNCH_APP } from "./types";

let initialState = {};

const common = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCH_APP:
            return {
                ...state,
                actualStep: action.step
            };
        default:
            return state;
    };
};

export default common;