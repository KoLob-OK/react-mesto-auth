import { useState } from 'react';

function Login({ onLogin }) {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginData((prevState) => ({
                ...prevState,
                [name]: value,
            })
        );
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            return;
        }
        onLogin(loginData);
    };

    return (
        <div className="login content__login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form"
                  onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <span id="email-error"
                      className="login__input-error"
                />
                <input
                    type="password"
                    name="password"
                    className="login__input"
                    placeholder="Пароль"
                    onChange={handleChange}
                    required
                />
                <span id="password-error"
                      className="login__input-error"
                />
                <button className="login__submit"
                        type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;