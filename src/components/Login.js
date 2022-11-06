function Login() {
    return (
        <div className="login content__login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form">
                <input
                    type="email"
                    className="login__input"
                    placeholder="Email"
                    required
                />
                <span id="email-error"
                      className="login__input-error"
                />
                <input
                    type="password"
                    className="login__input"
                    placeholder="Пароль"
                    min="6"
                    required
                />
                <span id="password-error"
                      className="login__input-error"
                />
                <button className="login__submit"
                        type="submit"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;