import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
    });


    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterData((prevState) => ({
            ...prevState,
            [name]: value,
            })
        );
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(registerData);
        onRegister(registerData);
    };

    return (
        <div className="login content__login">
            <h2 className="login__title">Регистрация</h2>
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
                    min="6"
                    onChange={handleChange}
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