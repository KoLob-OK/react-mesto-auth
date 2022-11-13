function HeaderMobile({ loggedIn, onSignOut, isOpen, changeMenu }) {
  return (
    <>
      {isOpen && (
        <div className="header__menu-mobile">
          <p className="header__email">{loggedIn}</p>
          <button onClick={onSignOut} className="header__out-btn">
            Выйти
          </button>
        </div>
      )}
    </>
  );
}

export default HeaderMobile;
