const closePopupButton = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('#button_edit');
const editProfilePopup = document.querySelector('#popup_edit');
const addPhotoButton = document.querySelector('#button_add')
const addPhotoPopup = document.querySelector('#popup_add');
const photoPopup = document.querySelector('#popup_photo');
const popup = document.querySelectorAll('.popup');
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
const photoPopupImage = document.querySelector('.popup__image');
const photoPopupTitle = document.querySelector('.popup__title');

const openPopup = (item) => {
    item.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

closePopupButton.forEach((closeButton) => {
    const popup = closeButton.closest('.popup');
    closeButton.addEventListener('click', () => closePopup(popup))
});

editProfileButton.addEventListener('click', (el) => {
    el.preventDefault();
    openPopup(editProfilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});

addPhotoButton.addEventListener('click', (el) => {
    el.preventDefault();
    openPopup(addPhotoPopup);
    photoNameInput.value = '';
    photoLinkInput.value = '';
});

const createCard = (link, title) => {
    const card = cardTemplate.content.querySelector('.places__card').cloneNode(true);
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__title').textContent = title;
    card.querySelector('.card__image').alt = title;
    card.querySelector('.card__like').addEventListener('click', (like) => {
        like.target.classList.toggle('card__like_active');
    });
    card.querySelector('.card__image').addEventListener('click', () => {
        openPopup(photoPopup);
        photoPopupImage.src = link;
        photoPopupImage.alt = title;
        photoPopupTitle.textContent = title;
    })
    card.querySelector('.card__delete').addEventListener('click', () => {
        card.closest('.places__card').remove();
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
    places.append(createCard(item.link, item.name));
});

const renderCards = (e) => {
    e.preventDefault();
    places.prepend(createCard(photoLinkInput.value, photoNameInput.value));
    closePopup(popup);
};

const editProfile = (e) => {
    e.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
    closePopup(popup);
};

addCardsForm.addEventListener('submit', renderCards);
editCardsForm.addEventListener('submit', editProfile);



