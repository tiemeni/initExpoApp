import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';


/**
 * @description user sign in.
 */
function* authSignIn({ payload }) {
    yield put({ type: types.REGISTER_USER_SUCCESS, payload: "test win" });
    // yield put({ type: types.REGISTER_USER_FAILED, payload: "test failed" });
}

export default function* UserSaga() {
    yield takeLatest(types.REGISTER_USER_REQUEST, authSignIn);
}