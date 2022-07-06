import { AnyAction } from 'redux';
import { /*CATEGORIES_ACTION_TYPES,*/ Category } from './category.types';
import {
  // CategoryAction,
  fetchCategoriesStart,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './category.action';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

/*
Problem to solve: Reducer to be more accurate as to what will happen - each of the actions can be any action. 
*/

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // the action received is only going to be 1 of 3 action types from CategoryAction
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }

  return state;

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,
  //       error: action.payload,
  //       isLoading: false,
  //     };

  //   default:
  //     return state;
  // }
};
