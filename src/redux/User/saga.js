import { put, takeLatest } from 'redux-saga/effects';
import * as types from './types';
import { postUnauthRequest } from '../../utils/api';
import { BASE_URL, USER_LOCAL_AUTH, USER_LOGIN, USER_REGISTRATION } from '../../constants/urls';
import * as RootNavigation from '../../routes/rootNavigation';
import * as SCREENS from '../../constants/screens'
import AsyncStorage from '@react-native-async-storage/async-storage'


/**
 * @description user sign up.
 */
function* authRegister({ payload }) {
    const url = BASE_URL + USER_REGISTRATION;

    try {
        const result = yield postUnauthRequest(url, payload);

        if (result.success) {
            yield AsyncStorage.setItem('accessToken', result.data.access_token);
            yield AsyncStorage.setItem('userInfos', result.data);
            if (payload.saveCredentials) yield AsyncStorage.setItem('userCredentials', JSON.stringify(payload));


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

function* authLogin({ payload }) {
    const url = BASE_URL + USER_LOGIN;

    try {
        const result = yield postUnauthRequest(url, payload);

        if (result.success) {
            // save user credentials if asked
            yield AsyncStorage.setItem('access_token', result.data.access_token);
            yield AsyncStorage.setItem('userInfos', JSON.stringify(result.data));
            if (payload.saveCredentials) {
                yield AsyncStorage.setItem('userCredentials', JSON.stringify(payload));
            }

            yield put({ type: types.LOGIN_SUCCESS, payload: result.data })
            RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        } else {
            yield put({ type: types.LOGIN_FAILED, payload: result.message })
        }
    } catch (error) {
        console.error(error);
        yield put({ type: types.REGISTER_USER_FAILED, payload: error })
    }
}

function* authLocalSignIn() {
    const url = BASE_URL + USER_LOCAL_AUTH

    try {
        const access_token = yield AsyncStorage.getItem("access_token");

        if (!access_token) {
            yield put({ type: types.LOCAL_AUTH_FAILED, payload: "" })
            return;
        };

        const result = yield postUnauthRequest(url, { token: access_token })
        if (!result.success) {
            yield put({ type: types.LOCAL_AUTH_FAILED, payload: result.message })
            return;
        }

        const userInfos = yield AsyncStorage.getItem("userInfos")

        yield put({ type: types.LOCAL_AUTH_SUCCESS, payload: JSON.parse(userInfos) })
        setTimeout(() => {
            RootNavigation.navigate(SCREENS.HOME_CONTAINER_ROUTE)
        }, 1000);
        return;
    } catch (error) {
        console.error(error)
        yield put({ type: types.LOCAL_AUTH_FAILED, })
    }
}

function* authLogout() {
    try {
        yield AsyncStorage.removeItem("access_token");
        yield AsyncStorage.removeItem("userInfos");
        RootNavigation.navigate(SCREENS.LOGIN, { refresh: true })
    } catch (error) {
        console.log(error)
        yield put({ type: types.LOGOUT_REQUEST, payload: error });
    }
}

export default function* UserSaga() {
    yield takeLatest(types.REGISTER_USER_REQUEST, authRegister);
    yield takeLatest(types.LOGIN_REQUEST, authLogin)
    yield takeLatest(types.LOCAL_AUTH_REQUEST, authLocalSignIn)
    yield takeLatest(types.LOGOUT_REQUEST, authLogout)
}