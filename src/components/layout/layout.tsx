import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from '../logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getLayoutState } from './utils';
import { useAppSelector, useAppDispatch } from '../../hooks/use-redux';
import { logoutAction } from '../../store/action';

function Layout() {
  const { pathname } = useLocation();
  const { rootClassName, shouldRenderUser, shouldRenderFooter } =
    getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setLogoutError(null);
    setIsLoggingOut(true);

    try {
      await dispatch(logoutAction()).unwrap();
    } catch {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', logoutError);
      setLogoutError('Logout error. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            {shouldRenderUser ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={
                        authorizationStatus === AuthorizationStatus.Auth
                          ? AppRoute.Favorites
                          : AppRoute.Login
                      }
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      {authorizationStatus === AuthorizationStatus.Auth ? (
                        <>
                          <span className="header__user-name user__name">
                            {user?.email || 'no email'}
                          </span>
                          <span className="header__favorite-count">3</span>
                        </>
                      ) : (
                        <span className="header__login">Sign In</span>
                      )}
                    </Link>
                  </li>
                  {authorizationStatus === AuthorizationStatus.Auth ? (
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={(evt) => {
                        evt.preventDefault();
                        void handleLogout();
                      }}
                      >
                        <span className="header__signout">{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </nav>
            ) : null}
            {logoutError && <p role="alert">{logoutError}</p>}
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter ? (
        <footer className="footer container">
          <Link to={AppRoute.Root} className="footer__logo-link">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width="64"
              height="33"
            />
          </Link>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
