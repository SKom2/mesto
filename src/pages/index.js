import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    validationConfig,
    initialCards,
    profileEditButton,
    profileEditPopup,
    photoAddButton,
    photoAddPopup,
    cardsAddForm,
    profileEditForm,
    places,
    nameInput,
    aboutInput,
    profileTitle,
    profileSubtitle,
    photoPopup
} from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import './index.css'

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card-template',
            {handleCardClick: (data) => {
                    const popupWithImage = new PopupWithImage(photoPopup);
                    popupWithImage.open(data);
                    popupWithImage.setEventListeners();
                }
            });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, places);


const popupWithEditProfileForm = new PopupWithForm({
    popupSelector: profileEditPopup,
    callBack: (data) => {
        userInfo.setUserInfo(data);
    }
});

const popupWithAddPhotoForm = new PopupWithForm({
        popupSelector: photoAddPopup,
        callBack: (item) => {
            const card = new Card(item, '#card-template',
                {handleCardClick: (data) => {
                        const popupWithImage = new PopupWithImage(photoPopup);
                        popupWithImage.open(data);
                        popupWithImage.setEventListeners();
                    }
                });
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        }
    });

const cardsAddFormValidator = new FormValidator(validationConfig, cardsAddForm);
const userInfo = new UserInfo({nameSelector: profileTitle, aboutUserSelector: profileSubtitle});
const editProfileFormValidator = new FormValidator(validationConfig, profileEditForm);

profileEditButton.addEventListener('click', () => {
    userInfo.setData(nameInput, aboutInput);
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

