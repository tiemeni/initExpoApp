import { sortArray } from "../../utils/helper";
import * as types from "./types"

const initialState = {
    rdvForm: {
        motif: null,
        praticien: null,
        profession: true,
        period: {
            day: null,
            time: null
        }
    },
    motifs: [],
    dispo: [],
    specialities: [],
    cliniques: [],
    praticiens: [],
    loading: false,
    success: null,
    error: null,
    errorMsg: null
};

const RDVReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FORM_RDV:
            return {
                ...state,
                rdvForm: action.payload,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_MOTIFS_REQUEST:
            console.log(action.payload)
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_MOTIFS_REQUEST_SUCCESS:
            return {
                ...state,
                motifs: action.payload,
                loading: false,
                success: true
            }
        case types.GET_MOTIFS_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        case types.GET_SPECIALITIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_SPECIALITIES_REQUEST_SUCCESS:
            console.log("in store-", action.payload)
            return {
                ...state,
                specialities: action.payload ?? [],
                loading: false,
                success: true
            }
        case types.GET_SPECIALITIES_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        case types.GET_CLINIQUES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_CLINIQUE_REQUEST_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                cliniques: action.payload,
                loading: false,
                success: true
            }
        case types.GET_CLINIQUE_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        case types.GET_PRATICIENS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_PRATICIENS_REQUEST_SUCCESS:
            console.log("HERER PRATS", action.payload)
            return {
                ...state,
                praticiens: action.payload,
                loading: false,
                success: true
            }
        case types.GET_PRATICIENS_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        case types.GET_DISPO_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: ""
            }
        case types.GET_DISPO_REQUEST_SUCCESS:
            console.log("------", sortArray("date", action.payload)[0])
            return {
                ...state,
                dispo: sortArray("date", action.payload),
                loading: false,
                success: true
            }
        case types.GET_DISPO_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                loading: false,
                success: false,
                error: true,
            }
        default:
            return state;
    }
}

export default RDVReducer;