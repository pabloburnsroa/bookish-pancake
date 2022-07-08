import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// REDUX-PERSIST
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// REDUX-THUNK
// import thunk from 'redux-thunk';

// REDUX-SAGA
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// Type root state
export type RootState = ReturnType<typeof rootReducer>;

/*
window object is typed
we want to extend on this - declare a global
*/
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

// Create redux saga middleware
const sagaMiddleware = createSagaMiddleware();

/* Only log middleware if we are in developement
    & filter out by boolean if we are not logging as logger will evaluate to false
    TypeScript won't know that by filtering out truthy/falsy the middleware will narrow its type down to middleware. Need to tell typescript what this middleware is doing
    */
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

/* REDUX-SAGA: After the store has been instantiated with the saga middleware, then it is run */
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// export const store = createStore(rootReducer, undefined, composedEnhancers);
