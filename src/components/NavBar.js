import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk, getCartThunk, getProductsThunk } from '../redux/actions';
import '../styles/nav-bar.css';
import Cart from './Cart';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const dispatch = useDispatch();

  const openCart = () => {
    setIsCartOpen(!isCartOpen);
    dispatch(getCartThunk());
  };

  const login = e => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginThunk(credentials))
      .then(res => {
        localStorage.setItem('token', res.data.data.token);
        setLoginError('');
        setIsLoginOpen(false);
      })
      .catch(error => {
        setLoginError(error.response.data.message);
        /* console.log(error.response) */
      });
  };

  return (
    <div className="nav-bar">
      <nav className="nav-main">
        <section className="title">
          <Link
            onClick={() => dispatch(getProductsThunk())}
            className="link-title"
            to={`/`}
          >
            e-commerce
          </Link>
        </section>
        <section className="buttons">
          <div className="buttons-container">
            <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
          <div className="buttons-container">
            <button onClick={openCart}>
              {' '}
              <i className="fa-solid fa-cart-shopping"></i>{' '}
            </button>
          </div>
          <div className="buttons-container">
            <button>
              {' '}
              <Link className="link-purchases" to={`/purchases`}>
                {' '}
                <i className="fa-solid fa-box-open"></i>{' '}
              </Link>{' '}
            </button>
          </div>
        </section>
      </nav>
      <div className="log-in-container">
        <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>
          <p className="profile-character">
            <i className="fa-solid fa-circle-user"></i>
          </p>
          {localStorage.getItem('token') ? (
            <button
              className="log-out-button"
              onClick={() => localStorage.setItem('token', '')}
              type="button"
            >
              Log out
            </button>
          ) : (
            <>
              <div className="log-in-clean">
                <div className="test-data">
                  <h5>Test data</h5>
                  <p>
                    <i className="fa-solid fa-envelope"></i> john@gmail.com
                  </p>
                  <p>
                    <i className="fa-solid fa-key"></i> john1234
                  </p>
                </div>
                <p className="email-password">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <p className="email-password">Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button className="log-in-button">Log in</button>
                <p className="error">{loginError}</p>
              </div>
            </>
          )}
        </form>
      </div>
      <Cart isOpen={isCartOpen} />
    </div>
  );
};

export default NavBar;
