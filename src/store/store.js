import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// REDUX-PERSIST
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// REDUX-THUNK
// import thunk from 'redux-thunk';

// REDUX-SAGA
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

// Create redux saga middleware
const sagaMiddleware = createSagaMiddleware();

/* Only log middleware if we are in developement
    & filter out by boolean if we are not logging as logger will evaluate to false
*/
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

/* REDUX-SAGA: After the store has been instantiated with the saga middleware, then it is run */
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// export const store = createStore(rootReducer, undefined, composedEnhancers);
