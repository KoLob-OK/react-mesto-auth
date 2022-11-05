import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
    // Используем реф для получения прямого доступа к DOM-элементу инпута и его значению
    const refAvatarInput = useRef();

    //Сброс полей инпутов при открытии попапа
    useEffect(() => {
        refAvatarInput.current.value = '';
    }, [isOpen]);

    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: refAvatarInput.current.value
        });
    }

    return(
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    ref={refAvatarInput}
                    required
                />
                <span id="avatar-error"
                      className="form__input-error"
                />
                <button className="form__submit"
                        type="submit">
                    {onLoading ? "Сохранение..." : "Сохранить"}
                </button>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup