import {FormValidator} from "../components/FormValidator.js";
import {
    apiConfig,
    avatarButton,
    avatarEditForm,
    cardsAddForm,
    photoAddButton,
    profileEditButton,
    profileEditForm,
    validationConfig
} from "../utils/constants.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import './index.css'
import {PopupWithImage} from "../components/PopupWithImage";
import {Card} from "../components/Card";
import {Api} from "../components/Api.js";

const api = new Api(apiConfig);

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutUserSelector: '.profile__subtitle',
    userSelector: '.profile__avatar'
});

Promise.all([api.getProfile(), api.getCards()])
    .then(([userData, cardsData]) => {
        userInfo.setUserInfo(userData);
        cardList.renderItems(cardsData);
})
    .catch(err => console.log(`Ошибка: ${err}`))


const renderCard = (item) => {
    const card = new Card(item, '#card-template', {
        handleCardClick: (data) => {
            popupWithImage.open(data);
        },
        handleLikeClick: (request, cardId) => {
            api.handleControlLikes(request, cardId)
                .then((res) => {
                    card.numberOfLikes(res.likes.length);
                })
                .catch(err => console.log(`Ошибка: ${err}`));
        },
        handleDeleteButtonClick: (cardId, element) => {
            popupWithDeletionConfirmationForm.open(cardId, element);
        }
    },
        userInfo.getUserId()
    );
    return card.generateCard();
}

const cardList = new Section ({
    renderer: (item) => {
        cardList.addItem(renderCard(item));
    }

}, '.places');

const popupWithImage = new PopupWithImage('#popup_photo');

const popupWithAddPhotoForm = new PopupWithForm('#popup_add', {
    callBack: (item) => {
        popupWithAddPhotoForm.changeButtonState(true, 'Создать', 'Создание...');
        api.addCard(item)
            .then((res) => {
                cardList.addItem(renderCard(item));
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => popupWithAddPhotoForm.changeButtonState(false, 'Создать', 'Создание...'));
    }
});

const popupWithEditProfileForm = new PopupWithForm('#popup_edit', {
    callBack: (data) => {
        popupWithEditProfileForm.changeButtonState(true, 'Сохранить', 'Сохранение...');
        api.editProfile(data)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => popupWithEditProfileForm.changeButtonState(false, 'Сохранить', 'Сохранение...'))

    },
    submit: null
});

const popupWithDeletionConfirmationForm = new PopupWithForm('#popup_delete-card', {
    callBack: null,
    submit: (cardId, element) => {
        popupWithDeletionConfirmationForm.changeButtonState(true, 'Да', 'Удаление...')
        api.deleteCard(cardId)
            .then(() => {
                element.remove();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => popupWithDeletionConfirmationForm.changeButtonState(false, 'Да', 'Удаление...'))
    },
});

const popupWithEditAvatarForm = new PopupWithForm('#popup_edit-avatar', {
    callBack: (data) => {
        popupWithEditAvatarForm.changeButtonState(true, 'Сохранить', 'Сохранение...')
        api.editAvatar(data.link)
            .then((res) => {
                userInfo.setUserInfo(res)
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => popupWithEditAvatarForm.changeButtonState(false, 'Сохранить', 'Сохранение...'))
    },
    submit: null
})

const cardsAddFormValidator = new FormValidator(validationConfig, cardsAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, profileEditForm);
const editAvatarFormValidator = new FormValidator(validationConfig, avatarEditForm);

profileEditButton.addEventListener('click', () => {
    const inputValues = userInfo.getUserInfo();
    popupWithEditProfileForm.setInputValues(inputValues);
    popupWithEditProfileForm.open();
    editProfileFormValidator.setState();
});

photoAddButton.addEventListener('click', () => {
    popupWithAddPhotoForm.open();
    cardsAddFormValidator.setButtonState();
})

avatarButton.addEventListener('click', () => {
    popupWithEditAvatarForm.open();
    editAvatarFormValidator.setButtonState();
})


editAvatarFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
cardsAddFormValidator.enableValidation();