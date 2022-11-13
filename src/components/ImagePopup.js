function ImagePopup({ card, onClose }) {
    function closePopupByOverlayClick(e) {
        if (e.target === e.currentTarget) onClose(e);
    }

    return (
        <div className={`popup popup_type_expand-image ${card.link ? "popup_opened" : ""}`}
             onClick={closePopupByOverlayClick}>
            <div className="popup__image-container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно"
                        onClick={onClose}>
                </button>
                <figure className="popup__figure">
                    <img className="popup__image"
                         src={card.link}
                         alt={card.name}
                    />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;