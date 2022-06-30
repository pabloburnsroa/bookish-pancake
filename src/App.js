import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from 'react';
import { checkUserSession } from './store/user/user.action';
// import {
//   createUserDocFromAuth,
//   getCurrentUser,
//   onAuthStateChangedListener,
// } from './util/firebase/firebase.utils';
// import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    /*
    // onAuthStateChangedListener receives a callback function method returns back a //// function that allows us to unsubscribe (stop listening)
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    // useEffect will run when we return from callback when it unmounts
    return unsubscribe;
    */
    // getCurrentUser();

    dispatch(checkUserSession());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
