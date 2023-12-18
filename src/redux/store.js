//미들웨어 모듈 import
//middleWare : A-B 프로세스가 있을때 A-(a1)-B, 특정 프로세스사이에 중간 작업을 추가해서 끼워넣기 위한 시스템적인 틀
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';

import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
