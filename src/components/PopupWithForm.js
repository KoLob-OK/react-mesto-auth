function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно"
                        onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-form`}
                      action="#"
                      className="form popup__form"
                      onSubmit={onSubmit}>
                {children}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;