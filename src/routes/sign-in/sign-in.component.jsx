import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../util/firebase/firebase.utils';

const SignIn = () => {
  // Sign-in logic for google user
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    // Create user
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
