import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { BASE_URL } from '../../constants/urls';
import { getUnauthRequest } from '../../utils/api';


function* getAllPraticiens() {
    let url = BASE_URL + '/ext_users/?isPraticien=true'
    try {
        const result = yield getUnauthRequest(url);
        if (result.success) {
            yield put({ type: types.GET_ALL_PRATICIENS_SUCCESS, payload: result.data })
            // RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.GET_ALL_PRATICIENS_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.GET_ALL_PRATICIENS_FAILED, payload: error })
    }
}

export default function* PraticienSaga() {
    yield takeLatest(types.GET_ALL_PRATICIENS, getAllPraticiens);
}