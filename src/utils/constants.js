export const popupCloseButtons = document.querySelectorAll('.popup__close');
export const profileEditButton = document.querySelector('#button_edit');
export const profileEditPopup = document.querySelector('#popup_edit');
export const photoAddButton = document.querySelector('#button_add')
export const photoAddPopup = document.querySelector('#popup_add');
export const popups = document.querySelectorAll('.popup');
export const cardsAddForm = document.querySelector('#cardsAddForm');
export const profileEditForm =document.querySelector('#profileEditForm')
export const places = document.querySelector('.places');
export const nameInput = document.querySelector('#name');
export const jobInput = document.querySelector('#about-person');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const photoPopupImage = document.querySelector('.popup__image');
export const photoPopupTitle = document.querySelector('.popup__title');
export const photoPopup = document.querySelector('#popup_photo');

const photoLinkInput = document.querySelector('#photo-link');
const photoNameInput = document.querySelector('#photo-name');
export const cardData = {name: photoNameInput.value, link: photoLinkInput.value};

export const validationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
};

export const initialCards = [
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