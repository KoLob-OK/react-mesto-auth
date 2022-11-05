import headerLogo from "../images/logo-place.svg";

function Header() {
    return (
        <header className="header page__header">
            <img className="header__logo"
                 src={headerLogo}
                 alt="Логотип с картой России"
            />
        </header>
    );
}

export default Header;