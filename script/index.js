const closePopupButton = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('#button_edit');
const editProfilePopup = document.querySelector('#popup_edit');
const addPhotoButton = document.querySelector('#button_add')
const addPhotoPopup = document.querySelector('#popup_add');
const popups = document.querySelectorAll('.popup');
const addCardsForm = document.querySelector('#form_2');
const editCardsForm =document.querySelector('#form_1')
const places = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template');
const photoLinkInput = document.querySelector('#photo-link');
const photoNameInput = document.querySelector('#photo-name');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = (item) => {
    item.addEventListener('click', (el) => {
        el.preventDefault();
        if (item === editProfileButton){
            editProfilePopup.classList.add('popup_opened');
            nameInput.value = profileTitle.textContent;
            jobInput.value = profileSubtitle.textContent;
        }
        else if (item === addPhotoButton){
            addPhotoPopup.classList.add('popup_opened');
            photoNameInput.value = '';
            photoLinkInput.value = '';
        }
    });
};

openPopup(editProfileButton);
openPopup(addPhotoButton);

const closePopup = (item) => {
    item.addEventListener('click', (el) => {
        el.preventDefault();
        popups.forEach((popup) => {
            popup.classList.remove('popup_opened');
        });
    });
};

closePopupButton.forEach((closeButton) => {
    closePopup(closeButton);
});

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

const createCard = (link, title) => {
    const card = cardTemplate.content.querySelector('.places__card').cloneNode(true);
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__title').textContent = title;
    card.querySelector('.card__image').alt = title;
    card.querySelector('.card__like').addEventListener('click', (like) => {
        like.target.classList.toggle('card__like_active');
    });
    return card;
};

initialCards.forEach((item) => {
    places.append(createCard(item.link, item.name));
});

const renderCards = (e) => {
    e.preventDefault();
    places.prepend(createCard(photoLinkInput.value, photoNameInput.value));
}

const editProfile = (e) => {
    e.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
}

addCardsForm.addEventListener('submit', renderCards);
editCardsForm.addEventListener('submit', editProfile);


