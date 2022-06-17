// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

// import {
//   signInWithGooglePopup,
//   auth,
//   createUserDocFromAuth,
//   signInWithGoogleRedirect,
// } from '../../util/firebase/firebase.utils';

import './authentication.styles.scss';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Authentication = () => {
  // useEffect(() => {
  //   (async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocFromAuth(response.user);
  //     }
  //   })();
  // }, []);

  return (
    <div className="authentication-container">
      

      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
