import * as types from "./types"

const initialState = {
    praticiens: []
};

const PraticienReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_PRATICIENS:
            return {
                ...state,
                loadingPraticiens: true,
                errorPraticien: false,
                errorMsgPraticiens: ""
            }
        case types.GET_ALL_PRATICIENS_SUCCESS:
            return {
                ...state,
                praticiens: action.payload,
                loadingPraticiens: false,
                successPraticiens: true
            }
        case types.GET_ALL_PRATICIENS_FAILED:
            return {
                ...state,
                errorMsgPraticiens: action.payload,
                loadingPraticiens: false,
                successPraticiens: false,
                errorPraticien: true,
            }
        default:
            return state;
    }
}

export default PraticienReducer;