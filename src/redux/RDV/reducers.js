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
    error: null,
    myRdv: [],
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
            return {
                ...state,
                motifsLoading: true,
                motifsError: false,
                motifsErrorMsg: ""
            }
        case types.GET_MOTIFS_REQUEST_SUCCESS:
            return {
                ...state,
                motifs: action.payload,
                motifsLoading: false,
                motifsSuccess: true
            }
        case types.GET_MOTIFS_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                motifsLoading: false,
                motifsSuccess: true,
                motifsError: true,
            }
        case types.GET_SPECIALITIES_REQUEST:
            return {
                ...state,
                specialityLoading: true,
                error: false,
                specialityErrorMsg: ""
            }
        case types.GET_SPECIALITIES_REQUEST_SUCCESS:
            return {
                ...state,
                specialities: action.payload ?? [],
                specialityLoading: false,
                success: true
            }
        case types.GET_SPECIALITIES_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                specialityLoading: false,
                success: false,
                error: true,
            }
        case types.GET_CLINIQUES_REQUEST:
            return {
                ...state,
                clinicLoading: true,
                clinicError: false,
                clinicErrorMsg: ""
            }
        case types.GET_CLINIQUE_REQUEST_SUCCESS:
            return {
                ...state,
                cliniques: action.payload,
                clinicLoading: false,
                clinicSuccess: true,
                clinicError: false
            }
        case types.GET_CLINIQUE_REQUEST_FAILED:
            return {
                ...state,
                errorMsg: action.payload,
                clinicLoading: false,
                clinicSuccess: false,
                clinicError: true,
            }
        case types.GET_PRATICIENS_REQUEST:
            return {
                ...state,
                praticiensLoading: true,
                praticiensError: false,
                praticiensErrorMsg: ""
            }
        case types.GET_PRATICIENS_REQUEST_SUCCESS:
            return {
                ...state,
                praticiens: action.payload,
                praticiensLoading: false,
                praticiensSuccess: true
            }
        case types.GET_PRATICIENS_REQUEST_FAILED:
            return {
                ...state,
                praticiensErrorMsg: action.payload,
                praticiensLoading: false,
                praticiensSuccess: false,
                praticiensError: true,
            }
        case types.GET_DISPO_REQUEST:
            return {
                ...state,
                dispoLoading: true,
                dispoError: false,
                dispoErrorMsg: ""
            }
        case types.GET_DISPO_REQUEST_SUCCESS:
            return {
                ...state,
                dispo: sortArray("date", action.payload),
                dispoLoading: false,
                dispoSuccess: true
            }
        case types.GET_DISPO_REQUEST_FAILED:
            return {
                ...state,
                dispoErrorMsg: action.payload,
                dispoLoading: false,
                dispoSuccess: false,
                dispoError: true,
            }
        case types.POST_RDV_REQUEST:
            return {
                ...state,
                loadingPostRdv: true,
                error: false,
                errorMsg: "",
                successPostRdv: false
            }
        case types.POST_RDV_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                loadingPostRdv: false,
                successPostRdv: true
            }
        case types.CLEAR_ERR_SUCC:
            return {
                ...state,
                errorMsgPostRDV: null,
                successPostRdv: false
            }
        case types.POST_RDV_REQUEST_FAILED:
            return {
                ...state,
                errorMsgPostRDV: action.payload,
                loading: false,
                success: false,
                loadingPostRdv: false,
                error: true,
            }
        case types.GET_ALL_MY_RDV:
            return {
                ...state,
                rdvLoading: true,
                rdvError: false,
                rdvErrorMsg: ""
            }
        case types.GET_ALL_MY_RDV_SUCCESS:
            return {
                ...state,
                myRdv: action.payload,
                rdvLoading: false,
                rdvSuccess: true
            }
        case types.GET_ALL_MY_RDV_FAILED:
            return {
                ...state,
                dispoErrorMsg: action.payload,
                rdvLoading: false,
                rdvSuccess: false,
                rdvError: true,
            }
        default:
            return state;
    }
}

export default RDVReducer;