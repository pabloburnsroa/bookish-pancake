import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
// import { useContext } from 'react';
import { useState } from 'react';
// UserContext will give back whatever is passed in as the value in UserContext.Provider - currentUser, setCurrentUser
// import { UserContext } from '../../contexts/user.context';
import Button from '../button/button.component';
import {
  createUserDocFromAuth,
  signAuthUserWithEmailandPassword,
  signInWithGooglePopup,
} from '../../util/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    // setCurrentUser(user);
    await createUserDocFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signAuthUserWithEmailandPassword(email, password);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('cannot find user');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button button_type="inverted" type="submit">
            Sign In
          </Button>
          <Button type="button" button_type="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
