import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

import headerLogo from "../images/logo-place.svg";

function Header(props) {
  let location = useLocation();

  const isMobile = useIsMobile();

  const { isOpen, loggedIn, onSignOut, setIsOpen, children } = props;

  return (
    <header className={isOpen ? "header_type_mobile" : "header page__header"}>
      {children}
      <div className={isMobile && "header__menu-mobile-container"}>
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип с картой России"
        />
        <button
          className={`header__burger-menu ${
            isOpen && "header__burger-menu-btn_opened"
          }`}
          onClick={() => setIsOpen()}
        />
      </div>
      {location.pathname === "/sign-in" ? (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      ) : location.pathname === "/sign-up" ? (
        <Link className="header__link" to="sign-in">
          Войти
        </Link>
      ) : location.pathname === "/" ? (
        <div className="header__menu">
          <p className="header__email">{loggedIn}</p>
          <button className="header__out-btn" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
