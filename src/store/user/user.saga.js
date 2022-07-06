import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  getCurrentUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signAuthUserWithEmailandPassword,
  createAuthUserFromEmailandPassword,
  signOutUser,
} from '../../utils/firebase/firebase.utils';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// Trigger google popup
export function* signInWithGoogle() {
  try {
    const user = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// signInWithEmail generator function
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signAuthUserWithEmailandPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// signUp generator
export function* signUp({ email, password, displayName }) {
  try {
    const { user } = yield call(
      createAuthUserFromEmailandPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// signOut generator
export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

// ENTRY POINTS:
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// USERSAGAS
export function* userSagas() {
  yield all(
    [call(onCheckUserSession)],
    [call(onGoogleSignInStart)],
    [call(onEmailSignInStart)],
    [call(onSignUpStart)],
    [call(onSignUpSuccess)]
  );
}
