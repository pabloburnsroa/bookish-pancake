import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../util/firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './navigation.styles.scss';

const Navigation = () => {
  // Access a user if signed-in
  const { currentUser } = useContext(UserContext);

  // No longer need this handler as onAuthStateChanged listener will trigger any changes to auth
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            SHOP
          </Link>
          {currentUser ? (
            <span onClick={signOutUser} className="nav-link">
              SIGN-OUT
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              SIGN-IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
