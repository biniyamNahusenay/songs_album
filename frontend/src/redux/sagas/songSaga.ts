import {call,put,takeLatest} from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import {fetchSongsRequest,fetchSongsSuccess,fetchSongsFailure,createSongStart,createSongSuccess,
    createSongFailure,updateSongStart,updateSongSuccess,updateSongFailure,deleteSongRequest,
    deleteSongSuccess,deleteSongFailure,filterSongsByGenres} from '../slices/songSlice'
import { Song , Songs} from '../slices/songSlice'
import { getSongList } from '../api/songApi'
import { PayloadAction } from '@reduxjs/toolkit'

function* fetchSongsSaga():Generator<any, void, AxiosResponse<Songs[]>>{
    try {
        const songs:AxiosResponse<Songs[]> = yield call(getSongList)
        yield put(fetchSongsSuccess(songs.data))
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