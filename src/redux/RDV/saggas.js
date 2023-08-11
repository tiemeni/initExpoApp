import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { getUnauthRequest, postUnauthRequest } from '../../utils/api';
import { BASE_URL } from '../../constants/urls';
import * as RootNavigation from '../../routes/rootNavigation';
import * as SCREENS from '../../constants/screens'
import { SETIDCENTRE } from '../commons/types';


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



export default function* RDVSagga() {
    yield takeLatest(types.GET_MOTIFS_REQUEST, getMotifs);
    yield takeLatest(types.GET_SPECIALITIES_REQUEST, getSpecialities);
    yield takeLatest(types.GET_CLINIQUES_REQUEST, getCliniques);
    yield takeLatest(types.GET_PRATICIENS_REQUEST, getPraticiens);
    yield takeLatest(types.GET_DISPO_REQUEST, getDispo);
}