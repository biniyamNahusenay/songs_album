import { all, fork } from 'redux-saga/effects';
import { watchCreateSongSaga, watchDeleteSong, watchSongSaga, watchUpdateSongSaga } from './songSaga';
import { watchFetchStatisticsSaga } from './statsSaga';
// import { watchStatsSaga } from './statsSaga';

export default function* rootSaga() {
  yield all([fork(watchSongSaga),fork(watchUpdateSongSaga),
    fork(watchDeleteSong),fork(watchCreateSongSaga),fork(watchFetchStatisticsSaga)]);
}