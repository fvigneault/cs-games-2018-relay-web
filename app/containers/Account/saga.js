import { call, put, takeLatest } from 'redux-saga/effects';

import request from '../../api/request';
import { errorAction, successAction } from '../../asyncDisplayer/containers/actions';
import { LOAD_ACCOUNTS } from './constants';

export function* fetchAccount(url, data) {
  try {
    const account = yield call(request, url, data);
    yield put(successAction(LOAD_ACCOUNTS, account));
  } catch (err) {
    yield put(errorAction(LOAD_ACCOUNTS, err));
  }
}

export function* getAccount(data) {
  yield fetchAccount("/api/account", data);
}

export default function* instrumentResultData() {
  yield takeLatest(LOAD_ACCOUNTS, getAccount);
}