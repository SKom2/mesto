import { Card } from "./Card.js";
import { FormValidator} from "./FormValidator.js";

const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('#button_edit');
const profileEditPopup = document.querySelector('#popup_edit');
const photoAddButton = document.querySelector('#button_add')
const photoAddPopup = document.querySelector('#popup_add');
const popups = document.querySelectorAll('.popup');
const cardsAddForm = document.querySelector('#form_2');
const cardsEditForm =document.querySelector('#form_1')
const places = document.querySelector('.places');
const photoLinkInput = document.querySelector('#photo-link');
const photoNameInput = document.querySelector('#photo-name');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about-person');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const closePopupByTapOnEsc = (evt) => {
    if (evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export const openPopup = (popups) => {
    popups.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByTapOnEsc);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByTapOnEsc);
}

popupCloseButtons.forEach((closeButton) => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup))
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

const editProfile = (evt) => {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
    closePopup(profileEditPopup);
};

initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');

    const cardElement = card.generateCard();
    places.append(cardElement);
})

const renderCards = (evt) => {
    evt.preventDefault();
    const nameInputValue = photoNameInput.value;
    const linkInputValue = photoLinkInput.value;
    const cardData = {name: nameInputValue, link: linkInputValue}
    const card = new Card(cardData, '#card-template')

    const cardElement = card.generateCard();
    places.prepend(cardElement);
    closePopup(photoAddPopup);
};

const cardsAddFormValidator = new FormValidator(validationConfig, photoAddPopup);
cardsAddFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, profileEditPopup);
editProfileFormValidator.enableValidation();

profileEditButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(profileEditPopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    editProfileFormValidator.setState()
});

photoAddButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(photoAddPopup);
    photoNameInput.value = '';
    photoLinkInput.value = '';
    cardsAddFormValidator.setButtonState();
});

cardsAddForm.addEventListener('submit', renderCards);
cardsEditForm.addEventListener('submit', editProfile);