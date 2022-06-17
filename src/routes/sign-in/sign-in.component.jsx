import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
  signInWithGooglePopup,
  auth,
  createUserDocFromAuth,
  signInWithGoogleRedirect,
} from '../../util/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocFromAuth(response.user);
      }
    })();
  }, []);

  // Sign-in logic for google user
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(user);
    // Create user
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <br />
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
