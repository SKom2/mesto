import { Card } from "./Card.js";
import { FormValidator} from "./FormValidator.js";
import { validationConfig, initialCards} from "./constants.js";

const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('#button_edit');
const profileEditPopup = document.querySelector('#popup_edit');
const photoAddButton = document.querySelector('#button_add')
const photoAddPopup = document.querySelector('#popup_add');
const popups = document.querySelectorAll('.popup');
const cardsAddForm = document.querySelector('#cardsAddForm');
const profileEditForm =document.querySelector('#profileEditForm')
const places = document.querySelector('.places');
const photoLinkInput = document.querySelector('#photo-link');
const photoNameInput = document.querySelector('#photo-name');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about-person');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const photoPopupImage = document.querySelector('.popup__image');
const photoPopupTitle = document.querySelector('.popup__title');
const photoPopup = document.querySelector('#popup_photo');

const openPopup = (popups) => {
    popups.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupByTapOnEsc );
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupByTapOnEsc );
}

const handleClosePopupByTapOnEsc  = (evt) => {
    if (evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
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

const handleOpenPopup = (name, link) => {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;
    openPopup(photoPopup);
}

const createCard = (cardData) => {
    return new Card(cardData, '#card-template', handleOpenPopup).generateCard();
}

const addCard = (newCard) => {
    places.prepend(newCard);
}

initialCards.forEach((item) => {
    addCard(createCard(item));
})

const renderNewCard = (evt) => {
    evt.preventDefault();
    const nameInputValue = photoNameInput.value;
    const linkInputValue = photoLinkInput.value;
    const cardData = {name: nameInputValue, link: linkInputValue};
    addCard(createCard(cardData));
    closePopup(photoAddPopup);
};

const cardsAddFormValidator = new FormValidator(validationConfig, cardsAddForm);
cardsAddFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, profileEditForm);
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
    cardsAddForm.reset();
    cardsAddFormValidator.setButtonState();
});

cardsAddForm.addEventListener('submit', renderNewCard);
profileEditForm.addEventListener('submit', editProfile);