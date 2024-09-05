import { all, fork } from 'redux-saga/effects';
import { watchDeleteSong, watchSongSaga, watchUpdateSongSaga } from './songSaga';
// import { watchStatsSaga } from './statsSaga';

export default function* rootSaga() {
  yield all([fork(watchSongSaga),fork(watchUpdateSongSaga),fork(watchDeleteSong)]);
}