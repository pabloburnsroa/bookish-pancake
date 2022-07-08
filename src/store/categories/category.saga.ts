// import { takeLatest, all, call, put } from 'redux-saga/effects';
import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    // yield - wait until you come back with something
    // call() - used anywhere you have a function and want to turn it into an effect, takes 2 arguments, method to call and paramaters
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    // put() is used instead of dispatch
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// Generators
export function* onFetchCategories() {
  // takeLatest() = where we receive actions
  // Whenever we take the latest fetch categories start action, initialise the fetchCategoriesAsync saga which will attempt to fetch the categories array and then if successful, put fetchCategoriesSuccess action with the categoriesArray
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// Accumulator that holds all of the sagas that relate to the category
export function* categoriesSaga() {
  // all() = run everything inside, only complete when all done
  yield all([call(onFetchCategories)]);
}
