import {useEffect, useState} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelConfirmPopup from './DelConfirmPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';
import auth from '../utils/auth';

function App() {
    // Задаем переменную состояния аутентификации
    const [loggedIn, setLoggedIn] = useState(false);
    // Задаем переменную состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    // Задаем выбранную для просмотра карточку
    const [selectedCard, setSelectedCard] = useState({});
    // Задаем выбранную для удаления карточку
    const [selectedForDelCard, setSelectedForDelCard] = useState(false);
    // Текущий пользователь
    const [currentUser, setCurrentUser] = useState({});
    // Авторизованный пользователь
    const [email, setEmail] = useState("");
    // Массив карточек
    const [cards, setCards] = useState([]);
    // Загружается
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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
        setIsInfoTooltipOpen(false)
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

    function onRegister(data) {
        return auth
            .register(data)
            .then(() => {
                setIsInfoTooltipOpen(true);
                history.push("/");
            })
            .catch(err => {
                setIsInfoTooltipOpen(true);
                console.log(`Произошла ошибка при регистрации: ${err}`);
            })
    }

    function onLogin(data) {
        console.log(data);
        return auth
            .authorize(data)
            .then(res => {
                setLoggedIn(true);
                localStorage.setItem("jwt", res.token);
            })
            .catch(err => {
                console.log(`Произошла ошибка при авторизации: ${err}`);
            })
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth
                .checkToken(jwt)
                .then(res => {
                    setEmail(res.data.email);
                    setLoggedIn(true);
                })
                .catch(err => {
                    console.log(`Произошла ошибка при проверке токена: ${err}`);
                })
        }
    }

    useEffect(() => {
        handleTokenCheck();
        if (loggedIn) {
            history.push("/");
        }
    }, [loggedIn, history]);

    function onSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        history.push("/sign-in");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header loggedIn={email}
                        onSignOut={onSignOut}
                />

                <Switch>
                    <Route path="/sign-in">
                        <Login onLogin={onLogin}
                        />
                    </Route>

                    <Route path="/sign-up">
                        <Register onRegister={onRegister}/>
                    </Route>

                    {loggedIn ? (
                        <ProtectedRoute exact
                                        path="/"
                                        loggedIn={loggedIn}
                                        component={Main}
                                        cards={cards}
                                        onEditAvatar={handleEditAvatarClick}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}
                        />
                    ) : (
                        <Redirect to="/sign-in"/>
                    )}
                </Switch>

                <Footer/>

                {/*попап добавления карточки*/}
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onLoading={isLoading}
                />

                {/*попап редактирования профиля-->*/}
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                />

                {/*попап обновления аватара профиля-->*/}
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onLoading={isLoading}
                />

                {/*попап подтверждения удаления карточки-->*/}
                <DelConfirmPopup
                    card={selectedForDelCard}
                    onClose={closeAllPopups}
                    onConfirm={handleConfirmDel}
                    onLoading={isLoading}
                />

                {/*попап просмотра фото-->*/}
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                {/*попап успеха/неудачи*/}
                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    name="auth"
                    onLogin={loggedIn}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;