const editButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');



function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent
};

function closePopup(){
    popup.classList.remove('popup_opened');    
};

function saveForm(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    profileTitle.textContent = nameInputValue;
    profileSubtitle.textContent = jobInputValue;
    closePopup();
}

formElement.addEventListener('submit',  saveForm);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);