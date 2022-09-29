import { all, cancelled, put, takeEvery } from 'redux-saga/effects';
import cuid from 'cuid';
import counterSlice from './counterSlice';
import { wait } from '../../lib/wait';
import { asyncCancellableSaga } from '../utils/reduxSagaUtils';

const {
  cancelAsync,
  increment,
  incrementAsync,
  loadingStart,
  loadingUpdate,
  loadingEnd,
} = counterSlice.actions;

function* incrementAsyncSaga(action) {
  const step = action.payload.step || 1;
  const reqId = cuid();
  const delay = action.payload.delay || 2000;

  const start = new Date();
  const startTime = new Date().getTime();
  const end = new Date();
  end.setTime(start.getTime() + delay);
  const endTime = end.getTime();

  try {
    yield put(loadingStart({ reqId, max: endTime - startTime }));
    let now;
    do {
      yield wait(10);
      now = new Date().getTime();
      yield put(loadingUpdate({ reqId, progression: now - startTime }));
    } while (now < end);
    yield put(increment({ step }));
    yield put(loadingEnd({ reqId }));
  } finally {
    if (yield cancelled()) {
      yield put(loadingEnd({ reqId }));
    }
  }
}

export default function* counterSaga() {
  yield all([
    takeEvery(
      incrementAsync,
      asyncCancellableSaga(incrementAsyncSaga, cancelAsync)
    ),
  ]);
}
