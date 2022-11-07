import {Link, useLocation} from 'react-router-dom';

import headerLogo from '../images/logo-place.svg';

function Header() {
    let location = useLocation();

    return (
        <header className="header page__header">
            <img className="header__logo"
                 src={headerLogo}
                 alt="Логотип с картой России"
            />
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
                    <p className="header__email">test@testmail.ru</p>
                    <button className="header__out-btn"
                            onClick=''>
                        Выйти
                    </button>
                </div>
            ) : (
                ""
            )
            }
        </header>
    );
}

export default Header;