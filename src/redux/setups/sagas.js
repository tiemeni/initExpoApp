import { all } from 'redux-saga/effects';
import UserSaga from '../User/saga';

/**

 * @description combine sagas.

 */

export default function* Sagas() {
  yield all([UserSaga()]);
}