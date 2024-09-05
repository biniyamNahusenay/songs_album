import {call,put,takeLatest} from 'redux-saga/effects'
// import axios, { AxiosResponse } from 'axios'
import {fetchSongsRequest,fetchSongsSuccess,fetchSongsFailure,createSongStart,createSongSuccess,
    createSongFailure,updateSongStart,updateSongSuccess,updateSongFailure,deleteSongRequest,
    deleteSongSuccess,deleteSongFailure,filterSongsByGenres} from '../slices/songSlice'
import { Song , Songs} from '../slices/songSlice'
import { deleteSong, getSongList, updateSong } from '../api/songApi'
import { PayloadAction } from '@reduxjs/toolkit'

function* fetchSongsSaga():Generator<any, void, Songs[]>{
    try {
        const songs:Songs[] = yield call(getSongList)
        if (songs) {
            yield put(fetchSongsSuccess(songs));
          } else {
            throw new Error('Received undefined data from API');
          }
        yield put(fetchSongsSuccess(songs))
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchSongsFailure(error.message));
          } else {
            yield put(fetchSongsFailure('An unknown error occurred.'));
          }
    }
}

export function* watchSongSaga() {
    yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
}

function* updateSongSaga(action: PayloadAction<Songs>): Generator<any, void, Songs> {
    try {
      // console.log("Saga received song to update:", action.payload);
      const updatedSong: Songs = yield call(updateSong, action.payload);
      // console.log(updatedSong)
      yield put(updateSongSuccess(updatedSong));
    } catch (error) {
      if (error instanceof Error) {
        yield put(updateSongFailure(error.message));
      } else {
        yield put(updateSongFailure('An unknown error occurred.'));
      }
    }
  }
  
  export function* watchUpdateSongSaga() {
    yield takeLatest(updateSongStart.type, updateSongSaga);
  }

  function* deleteSongSaga(action: PayloadAction<string>): Generator<any, void, void> {
    try {
      const  id  = action.payload;
      console.log(id)
      yield call(deleteSong, id);
      yield put(deleteSongSuccess(id)); // Dispatch the success action with the song ID to remove it from the state
    } catch (error) {
      if (error instanceof Error) {
        yield put(deleteSongFailure(error.message)); // Dispatch failure action with error message
      } else {
        yield put(deleteSongFailure('An unknown error occurred.')); // Handle unexpected errors
      }
    }
  }
  
  export function* watchDeleteSong() {
    yield takeLatest(deleteSongRequest.type, deleteSongSaga);
  }