import * as types from "./types";


export const setRDVForm = payload => {
    return {
        type: types.SET_FORM_RDV,
        payload
    }
}

export const getMotifs = (data) => {
    return {
        type: types.GET_MOTIFS_REQUEST,
        data
    }
}

export const getClinique = (id) => {
    return {
        type: types.GET_CLINIQUES_REQUEST,
        id
    }
}

export const getSpecialities = (id) => {
    return {
        type: types.GET_SPECIALITIES_REQUEST,
        id
    }
}

export const getPraticiens = data => {
    return {
        type: types.GET_PRATICIENS_REQUEST,
        data
    }
}

export const getDispo = data => {
    return {
        type: types.GET_DISPO_REQUEST,
        data
    }
}