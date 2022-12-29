const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileEditButton = document.querySelector('#button_edit');
const profileEditPopup = document.querySelector('#popup_edit');
const photoAddButton = document.querySelector('#button_add')
const photoAddPopup = document.querySelector('#popup_add');
const photoPopup = document.querySelector('#popup_photo');
const cardsAddForm = document.querySelector('#form_2');
const cardsEditForm =document.querySelector('#form_1')
const places = document.querySelector('.places');
const popups = document.querySelectorAll('.popup')
const cardTemplate = document.querySelector('#card-template');
const photoLinkInput = document.querySelector('#photo-link');
const photoNameInput = document.querySelector('#photo-name');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about-person');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const photoPopupImage = document.querySelector('.popup__image');
const photoPopupTitle = document.querySelector('.popup__title');
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

const handleClosePopupByTapOnEsc = (evt) => {
    if (evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

const openPopup = (popups) => {
    popups.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupByTapOnEsc);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleClosePopupByTapOnEsc);
}

popupCloseButtons.forEach((closeButton) => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup))
});

profileEditButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    setButtonState(profileEditPopup, validationConfig);
    setInputValidity(profileEditPopup, validationConfig);
    openPopup(profileEditPopup);
});


photoAddButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    photoNameInput.value = '';
    photoLinkInput.value = '';
    setButtonState(photoAddPopup, validationConfig);
    openPopup(photoAddPopup);
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

const handleLikeCard = (like) => {
    like.target.classList.toggle('card__like_active');
};

const createCard = (cardData) => {
    const card = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image')
    cardImage.src = cardData.link;
    cardImage.alt = cardData.title;
    card.querySelector('.card__title').textContent = cardData.title;
    card.querySelector('.card__like').addEventListener('click', handleLikeCard)
    cardImage.addEventListener('click', () => {
        photoPopupImage.src = cardData.link;
        photoPopupImage.alt = cardData.title;
        photoPopupTitle.textContent = cardData.title;
        openPopup(photoPopup);
    })
    card.querySelector('.card__delete').addEventListener('click', () => {
        card.closest('.card').remove();
    })
    return card;
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

initialCards.forEach((item) => {
    const itemName = item.name;
    const itemLink = item.link;
    const cardData = {title: itemName, link: itemLink}
    places.append(createCard(cardData));
});

const renderCards = (evt) => {
    evt.preventDefault();
    const nameInputValue = photoNameInput.value;
    const linkInputValue = photoLinkInput.value;
    const cardData = {title: nameInputValue, link: linkInputValue}
    places.prepend(createCard(cardData));
    closePopup(photoAddPopup);
};

const editProfile = (evt) => {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
    closePopup(profileEditPopup);
};

cardsAddForm.addEventListener('submit', renderCards);
cardsEditForm.addEventListener('submit', editProfile);

enableValidation(validationConfig);