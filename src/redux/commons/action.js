import { LAUNCH_APP, SET_PROFESSION, SHOULD_SEE_BEHIND } from "./types"

export const setApp = (step) => {
    return {
        type: LAUNCH_APP,
        step
    }
}

export const setProfessionForRdv = (p) => {
    return {
        type: SET_PROFESSION,
        p
    }
}

export const setShouldSeeBehind = s => {
    return {
        type: SHOULD_SEE_BEHIND,
        s
    }
}