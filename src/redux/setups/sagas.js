import { all } from 'redux-saga/effects';
import ProfessionSagga from '../professions/saggas';
import RDVSagga from '../RDV/saggas';
import UserSaga from '../User/saga';
import PraticienSaga from '../Praticiens/saga';

/**

 * @description combine sagas.

 */

export default function* Sagas() {
  yield all([UserSaga(), ProfessionSagga(), RDVSagga(), PraticienSaga()]);
}