import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest, postUnauthRequest } from '../../utils/api';
import { BASE_URL } from '../../constants/urls';
import * as RootNavigation from '../../routes/rootNavigation';
import * as SCREENS from '../../constants/screens'
import { MY_FICHES, SETIDCENTRE } from '../commons/types';


/**
 * @description user sign up.
 */
function* getMotifs({ data }) {
    yield console.log("process get motifs---", data?.id)
    let url = data.forSpec ? BASE_URL + "/motif/speciality/" + data?.id : BASE_URL + '/motif/profession/' + data?.id
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_MOTIFS_REQUEST_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_MOTIFS_REQUEST_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_MOTIFS_REQUEST_FAILED, payload: error })
    }
}

function* getSpecialities({ id }) {
    yield console.log("process get speciality---", id)
    let url = BASE_URL + '/ext_specialites/profession/' + id
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_SPECIALITIES_REQUEST_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_SPECIALITIES_REQUEST_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_SPECIALITIES_REQUEST_FAILED, payload: error })
    }
}

function* getCliniques({ id }) {
    yield console.log("process get clinique---", id)
    let url = BASE_URL + '/motif/lieu/' + id
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            console.log(result)
            yield put({ type: types.GET_CLINIQUE_REQUEST_SUCCESS, payload: result.data })
            yield put({ type: SETIDCENTRE, payload: result.data[0]?.idCentre })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_CLINIQUE_REQUEST_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_CLINIQUE_REQUEST_FAILED, payload: error })
    }
}

function* getPraticiens({ data }) {
    yield console.log("process get praticiens---", data?.id)
    let url = BASE_URL + "/ext_users/lieu/?isPraticien=true&idLieu=" + data?.id + "&idSpeciality=" + data?.ids
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_PRATICIENS_REQUEST_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_PRATICIENS_REQUEST_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_PRATICIENS_REQUEST_FAILED, payload: error })
    }
}

function* getDispo({ data }) {
    yield console.log("process get dispo---", data?.idCentre)
    let url = BASE_URL + "/appointments/rechercher_dispo?idCentre=" + data?.idCentre + "&idp=" + data?.idp
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_DISPO_REQUEST_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_DISPO_REQUEST_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_DISPO_REQUEST_FAILED, payload: error })
    }
}


function* postRDV({ data }) {
    // yield console.log("process post rdv---", data?.idCentre)
    let url1 = BASE_URL + "/patients/register?idCentre=" + data?.idCentre
    let url2 = BASE_URL + "/appointments/enregistrer_rdv/?idCentre=" + data?.idCentre
    console.log("for data --- ", data)
    const payload = {
        name: data?.user?.name,
        surname: data?.user.surname,
        birthdate: data?.user.birthdate,
        telephone: data?.user.telephone,
        email: data?.user.email,
        active: true,
        idCentre: data?.idCentre
    }
    try {
        const result = yield postUnauthRequest(url1, payload);
        let idFiche;
        console.log("for patients---", result)
        let rdv;
        if (result.message) {
            const rdvData = {
                centre: data?.idCentre,
                practitioner: data?.praticien,
                patient: result.message,
                motif: data?.motif,
                startTime: "09:30",
                // data?.period?.time,
                endTime: "10:00",
                provenance: "mobile",
                duration: 20,
                // "dayOfWeek": 1,
                date: data?.period?.day,
            }
            console.log(url2)
            idFiche = result.message
            rdv = yield postUnauthRequest(url2, rdvData);
            // yield put({ type: types.GET_DISPO_REQUEST_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else if (result.data._id) {
            const rdvData = {
                centre: data?.idCentre,
                practitioner: data?.praticien,
                patient: result.data._id,
                motif: data?.motif,
                startTime: "09:30",
                // data?.period?.time,
                endTime: "10:00",
                provenance: "mobile",
                duration: 20,
                // "dayOfWeek": 1,
                date: data?.period?.day,
            }
            idFiche = result.data?._id
            rdv = yield postUnauthRequest(url2, rdvData);
        } else {
            yield put({ type: types.POST_RDV_REQUEST_FAILED, payload: "Erreur lors de la creation du rendez-vous!" })
            yield setTimeout(() => {
                RootNavigation.navigate(SCREENS.ACCEUIL)
                put({ type: "CLEAR_ERR_SUCC" })
            }, 3000)
        }
        if (rdv.success) {
            console.log("rdv success", rdv)

            yield put({ type: types.POST_RDV_REQUEST_SUCCESS, payload: rdv?.data })
            yield put({ type: MY_FICHES, payload: idFiche })
            yield setTimeout(() => {
                RootNavigation.navigate(SCREENS.RDV)
                put({ type: "CLEAR_ERR_SUCC" })
            }, 3000)
        } else {
            console.log("Erreur lors de la creation du rendez-vous!")
            yield put({ type: types.POST_RDV_REQUEST_FAILED, payload: "Erreur lors de la creation du rendez-vous!" })
            yield setTimeout(() => {
                RootNavigation.navigate(SCREENS.ACCEUIL)
                put({ type: "CLEAR_ERR_SUCC" })
            }, 3000)
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.POST_RDV_REQUEST_FAILED, payload: error })
        yield setTimeout(() => {
            RootNavigation.navigate(SCREENS.ACCEUIL)
            put({ type: "CLEAR_ERR_SUCC" })
        }, 3000)
    }
}


export default function* RDVSagga() {
    yield takeLatest(types.GET_MOTIFS_REQUEST, getMotifs);
    yield takeLatest(types.GET_SPECIALITIES_REQUEST, getSpecialities);
    yield takeLatest(types.GET_CLINIQUES_REQUEST, getCliniques);
    yield takeLatest(types.GET_PRATICIENS_REQUEST, getPraticiens);
    yield takeLatest(types.GET_DISPO_REQUEST, getDispo);
    yield takeLatest(types.POST_RDV_REQUEST, postRDV);
}