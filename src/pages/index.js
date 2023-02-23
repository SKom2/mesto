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

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        cardList.renderCard(item);
    }
}, '.places');


const popupWithEditProfileForm = new PopupWithForm('#popup_edit', {
    callBack: (data) => {
        userInfo.setUserInfo(data);
    }
});

const popupWithAddPhotoForm = new PopupWithForm('#popup_add', {
    callBack: (item) => {
        cardList.renderCard(item);
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

