const closePopupButton = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('#button_edit');
const editProfilePopup = document.querySelector('#popup_edit');
const addPhotoButton = document.querySelector('#button_add')
const addPhotoPopup = document.querySelector('#popup_add');
const popups = document.querySelectorAll('.popup');
const addCardsForm = document.querySelector('#form_2');
const editCardsForm =document.querySelector('#form_1')
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

const closePopupByTapOnEsc = (evt) => {
    if (evt.key === 'Escape'){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

const openPopup = (popups) => {
    popups.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByTapOnEsc);
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByTapOnEsc);
}

closePopupButton.forEach((closeButton) => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup))
});

editProfileButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(editProfilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    setButtonState(editProfilePopup, validationConfig);
    setInputValidity(editProfilePopup, validationConfig);
});

addPhotoButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(addPhotoPopup);
    photoNameInput.value = '';
    photoLinkInput.value = '';
    setButtonState(addPhotoPopup, validationConfig);
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
    closePopup(editProfilePopup);
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

class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _setData() {
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__title').textContent = this._title;
    }

    _handleOpenPopup() {
        const photoPopupImage = document.querySelector('.popup__image');
        const photoPopupTitle = document.querySelector('.popup__title');
        const photoPopup = document.querySelector('#popup_photo');
        photoPopupImage.src = this._image;
        photoPopupImage.alt = this._title;
        photoPopupTitle.textContent = this._title;
        openPopup(photoPopup);
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        const like = this._element.querySelector('.card__like');
        like.classList.toggle('card__like_active');
    }

    _setEventListeners() {
        const deleteButton = this._element.querySelector('.card__delete');
        deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })
        const cardImage = this._element.querySelector('.card__image');
        cardImage.addEventListener('click', () => {
            this._handleOpenPopup();
        })
        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', () => {
            this._likeCard();
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setData();
        this._setEventListeners();

        return this._element;
    }

}

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
    closePopup(addPhotoPopup);
};

addCardsForm.addEventListener('submit', renderCards);
editCardsForm.addEventListener('submit', editProfile);

enableValidation(validationConfig);