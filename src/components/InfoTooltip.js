import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function InfoTooltip({ name, isOpen, onClose, onLogin }) {
    function closePopupByOverlayClick(e) {
        if (e.target === e.currentTarget) onClose(e);
    }
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
             onClick={closePopupByOverlayClick}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно"
                        onClick={onClose}
                />
                <div className="popup__auth">
                    {onLogin ? (
                        <>
                            <img
                                className="popup__auth-icon"
                                src={successIcon}
                                alt="Регистрация успешна"
                            />
                            <h2 className="popup__auth-text">
                                Вы успешно зарегистрировались!
                            </h2>
                        </>
                    ) : (
                        <>
                            <img
                                className="popup__auth-icon"
                                src={failIcon}
                                alt="Ошибка. Регистрация не выполнена"
                            />
                            <h2 className="popup__auth-text">
                                Что-то пошло не так!
                                Попробуйте ещё раз.
                            </h2>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}


export default InfoTooltip;