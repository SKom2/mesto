import { FormValidator } from "../components/FormValidator.js";
import {
    validationConfig,
    initialCards,
    profileEditButton,
    photoAddButton,
    cardsAddForm,
    profileEditForm
} from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import './index.css'
import {PopupWithImage} from "../components/PopupWithImage";
import {Card} from "../components/Card";

const popupWithImage = new PopupWithImage('#popup_photo');

const renderCard = (item) => {
    const card = new Card(item, '#card-template', {
        handleCardClick: (data) => {
            popupWithImage.open(data);
        }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
}

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        renderCard(item);
    }
}, '.places');

const popupWithAddPhotoForm = new PopupWithForm('#popup_add', {
    callBack: (item) => {
        renderCard(item);
    }
});

const popupWithEditProfileForm = new PopupWithForm('#popup_edit', {
    callBack: (data) => {
        userInfo.setUserInfo(data);
    }
});

const userInfo = new UserInfo({nameSelector: '.profile__title', aboutUserSelector: '.profile__subtitle'});
const cardsAddFormValidator = new FormValidator(validationConfig, cardsAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, profileEditForm);

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

cardList.renderItems();
editProfileFormValidator.enableValidation();
cardsAddFormValidator.enableValidation();

