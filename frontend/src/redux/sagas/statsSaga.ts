import { call, put, takeLatest } from 'redux-saga/effects';
import { getStatisticsApi } from '../api/statisticsApi';
import {
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  StatisticsState,
} from '../slices/statSlice'

function* fetchStatisticsSaga():Generator<any, void> {
  try {
    const data:StatisticsState = yield call(getStatisticsApi);
    yield put(fetchStatisticsSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
        yield put(fetchStatisticsFailure(error.message));
      } else {
        yield put(fetchStatisticsFailure('An unknown error occurred.'));
      }
  }
}

export function* watchFetchStatisticsSaga() {
  yield takeLatest(fetchStatisticsStart.type, fetchStatisticsSaga);
}
