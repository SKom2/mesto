import { Card } from "../components/Card.js";
import { FormValidator} from "../components/FormValidator.js";
import {
    validationConfig,
    initialCards,
    popupCloseButtons,
    profileEditButton,
    profileEditPopup,
    photoAddButton,
    photoAddPopup,
    popups,
    cardsAddForm,
    profileEditForm,
    places,
    nameInput,
    jobInput,
    profileTitle,
    profileSubtitle,
    photoPopupImage,
    photoPopupTitle,
    photoPopup,
    cardData
    } from "../utils/constants.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import './index.css'

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '#card-template', handleOpenPopup);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, places);


// const newCardList = new Section({
//     items: cardData,
//     renderer: (item) => {
//         const card = new Card(item, '#card-template', handleOpenPopup);
//         const cardElement = card.generateCard();
//         newCardList.addItem(cardElement);
//     }
// }, places);

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

// const createCard = (cardData) => {
//     return new Card(cardData, '#card-template', handleOpenPopup).generateCard();
// }
//
// const addCard = (newCard) => {
//     places.prepend(newCard);
// }
//
// initialCards.forEach((item) => {
//     addCard(createCard(item));
// })

// const renderNewCard = (evt) => {
//     evt.preventDefault();
//     const nameInputValue = photoNameInput.value;
//     const linkInputValue = photoLinkInput.value;
//     const cardData = {name: nameInputValue, link: linkInputValue};
//     addCard(createCard(cardData));
//     closePopup(photoAddPopup);
// };

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

// cardsAddForm.addEventListener('submit', newCardList.renderNewCard);
profileEditForm.addEventListener('submit', editProfile);

cardList.renderItems();