/* eslint-disable */
import { call, put, takeLatest } from 'redux-saga/effects';
import { EmptyActionCreator, PayloadActionCreator } from 'typesafe-actions';

type Action = EmptyActionCreator<string> | PayloadActionCreator<string, any>;

type AsyncAction = { request: Action; success: Action; failure: Action };

type RequestPayload<T extends AsyncAction> = Parameters<T['request']>[0];

type SuccessPayload<T extends AsyncAction> = Parameters<T['success']>[0];

type ErrorPayload<T extends AsyncAction> = Parameters<T['failure']>[0];

function* makeApiCall<T extends AsyncAction>(
  action: T,
  apiRequest: (payload: RequestPayload<T>) => Promise<SuccessPayload<T>>,
  onSuccess?: (resp: SuccessPayload<T>, payload: RequestPayload<T>) => void,
  onError?: (resp: ErrorPayload<T>) => void,
) {
  yield takeLatest(
    action.request,
    function* ({ payload, type }: RequestPayload<T>) {
      try {
        const resp = yield call(apiRequest, payload);
        yield put(action.success(resp));
        if (onSuccess) {
          yield call(onSuccess, resp, payload);
        }
      } catch (e) {
        const errorWithAction = { error: e, action: { payload, type } };
        yield put(action.failure(errorWithAction));
        if (onError) {
          yield call(onError, errorWithAction);
        }
      }
    },
  );
}

export default makeApiCall;
