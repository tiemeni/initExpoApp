import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { postUnauthRequest } from '../../utils/api';
import { BASE_URL, USER_REGISTRATION } from '../../constants/urls';
import * as RootNavigation from '../../routes/rootNavigation';
import * as SCREENS from '../../constants/screens'


/**
 * @description user sign up.
 */
function* authRegister({ payload }) {
    const url = BASE_URL + USER_REGISTRATION;

    try {
        const result = yield postUnauthRequest(url, payload);

        if (result.success) {
            yield put({ type: types.REGISTER_USER_SUCCESS, payload: result.data })
            RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.REGISTER_USER_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.REGISTER_USER_FAILED, payload: error })
    }
}

export default function* UserSaga() {
    yield takeLatest(types.REGISTER_USER_REQUEST, authRegister);
}