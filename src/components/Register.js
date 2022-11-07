import { Link } from 'react-router-dom';

function Register() {
    return (
        <div className="login content__login">
            <h2 className="login__title">Регистрация</h2>
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
                <span id="email-error"
                      className="login__input-error"
                />
                <button className="login__submit"
                        type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <p className="login__link-text">
                Уже зарегистрированы?
                <Link
                    className="login__link"
                    to="/sign-in">
                    Войти
                </Link>
            </p>
        </div>
    );
}

export default Register;