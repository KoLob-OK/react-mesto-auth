import { useEffect, useState } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelConfirmPopup from './DelConfirmPopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';

function App() {
    // Задаем переменную состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    // Задаем выбранную для просмотра карточку
    const [selectedCard, setSelectedCard] = useState({});
    // Задаем выбранную для удаления карточку
    const [selectedForDelCard, setSelectedForDelCard] = useState(false);
    // Текущий пользователь
    const [currentUser, setCurrentUser] = useState({});
    // Массив карточек
    const [cards, setCards] = useState([]);
    // Загружается
    const [isLoading, setIsLoading] = useState(false);

    // Используем эффект для получения массива с начальными карточками и данных пользователя
    useEffect(() => {
        api
            .getInitialCards()
            .then(initialCards => {
                setCards(initialCards);
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке картинок: ${err}`);
            });

        api
            .getUserData()
            .then(userData => {
                setCurrentUser(userData);
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке данных пользователя: ${err}`);
            });
    }, []);

    // Обработчик клика аватара (открывание EditAvatarPopup)
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    // Обработчик клика кнопки редактирования профиля (открывание EditProfilePopup)
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    // Обработчик клика кнопки "+" (открывание AddPlacePopup)
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // Обработчик клика по картинке (открывание ImagePopup)
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // Функция закрытия попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setSelectedForDelCard(false);
    }

    // Обработчик отправки данных пользователя
    function handleUpdateUser(userData) {
        setIsLoading(true);
        api
            .changeUserData(userData)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при изменении данных пользователя: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Обработчик отправки данных аватара
    function handleUpdateAvatar(userAvatar) {
        setIsLoading(true);
        api
            .updateAvatar(userAvatar)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при обновлении аватара: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Функция-обработчик изменения лайка
    function handleCardLike(card) {
        // Объявляем переменную "Есть Лайк" (isLiked) - проверяем, есть ли уже мой лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Делаем запрос на сервер
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                // Перебором по массиву методом map проверяем, есть ли лайк у карточки
                // (если id карточки в стейте (card) точно равен id карточки из массива c сервера (newCard),
                // то лайк есть, создаем newCard... иначе следующая карточка без лайка)
                setCards((cards) => cards.map((card) => card._id === newCard._id ? newCard : card));
            })
            .catch(err => {
                console.log(`Произошла ошибка при изменении лайка: ${err}`);
            });
    }

    // Функция-обработчик добавления карточки
    function handleAddPlaceSubmit(newPlace) {
        setIsLoading(true);
        api
            .addCard(newPlace)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке картинки: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    // Функция-обработчик удаления карточки (открывание DelConfirmPopup)
    function handleCardDelete(card) {
        setSelectedForDelCard(card);
    }

    // Функция-обработчик подтверждения удаления карточки
    function handleConfirmDel() {
        setIsLoading(true);
        api
            .delCard(selectedForDelCard)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== selectedForDelCard));
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при удалении картинки: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer/>

                /попап добавления карточки
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onLoading={isLoading}
                />

                /попап редактирования профиля-->
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                />

                /попап обновления аватара профиля-->
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onLoading={isLoading}
                />

                /попап подтверждения удаления карточки-->
                <DelConfirmPopup
                    card={selectedForDelCard}
                    onClose={closeAllPopups}
                    onConfirm={handleConfirmDel}
                    onLoading={isLoading}
                />

                /попап просмотра фото-->
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;