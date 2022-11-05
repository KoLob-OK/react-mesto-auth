import { useEffect, useState, useContext } from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //Сброс полей инпутов при открытии попапа (текущий пользователь)
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    // Обработчик имени
    function handleNameChange(e) {
        setName(e.target.value);
    }

    // Обработчик профессии
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    // Обработчик сабмита формы
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            username: name,
            job: description
        });
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_username"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    value={name ?? ''}
                    onChange={handleNameChange}
                    required
                />
                <span id="username-error"
                      className="form__input-error"
                />

                <input
                    className="form__input form__input_type_job"
                    type="text"
                    name="job"
                    id="job"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value={description ?? ''}
                    onChange={handleDescriptionChange}
                    required
                />
                <span id="job-error"
                      className="form__input-error"
                />

                <button className="form__submit"
                        type="submit">
                    {onLoading ? "Сохранение..." : "Сохранить"}
                </button>

            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;