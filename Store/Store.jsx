import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './SagaRoot';
import { profile } from '../src/Container/Profile-reducer';
import themeReducer from '../src/Common/themeSlice';

const rootReducer = combineReducers({
    profile,
    theme: themeReducer,
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootSaga);


export default store