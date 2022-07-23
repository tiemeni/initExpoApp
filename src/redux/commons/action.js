import { LAUNCH_APP } from "./types"

export const setApp = (step) => {
    return {
        type: LAUNCH_APP,
        step
    }
}