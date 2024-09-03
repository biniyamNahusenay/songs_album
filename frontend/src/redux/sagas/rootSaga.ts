import { all, fork } from 'redux-saga/effects';
import { watchSongSaga } from './songSaga';
// import { watchStatsSaga } from './statsSaga';

export default function* rootSaga() {
  yield all([fork(watchSongSaga)]);
}