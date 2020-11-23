import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { spawn } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import * as Pages from 'src/screens/Pages/redux';

function* rootSaga() {
  yield spawn(Pages.saga);
}

const rootReducer = combineReducers({
  pages: Pages.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
