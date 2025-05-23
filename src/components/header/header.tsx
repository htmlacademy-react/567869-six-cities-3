import Logo from '../logo/logo';
import HeaderNav from './header-nav';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
